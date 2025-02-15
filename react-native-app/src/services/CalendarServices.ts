import ICAL from "ical.js";

const loadICSFromURL = async (url: string) => {
    try {
        const response = await fetch(url);
        const text = await response.text();
        const jcalData = ICAL.parse(text);
        console.log("✅ ICS parsé");
        return jcalData;  // 🟢 On renvoie les données parsées !
    } catch (error) {
        console.error("❌ Erreur lors du chargement du fichier ICS :", error);
        return null;  // 🔴 Renvoie null en cas d'erreur
    }
};

const extractEvents = (jcalData: any) => {
    try {
        // Vérifier que c'est bien un VCALENDAR
        if (!Array.isArray(jcalData) || jcalData.length < 3 || jcalData[0] !== "vcalendar") {
            console.error("Format jCal invalide ou absence de vcalendar :", jcalData);
            return [];
        }

        // Créer un composant ICAL.Component à partir du jCal déjà parsé
        const comp = new ICAL.Component(jcalData);

        // Récupérer tous les événements (vevent)
        const vevents = comp.getAllSubcomponents("vevent") || [];
        if (vevents.length === 0) {
            console.warn("Aucun événement trouvé dans le fichier .ics.");
            return [];
        }

        return vevents.map(event => {
            try {
                const vevent = new ICAL.Event(event);
                return {
                    summary: vevent.summary || "Sans titre",
                    start: vevent.startDate ? vevent.startDate.toString() : "Inconnu",
                    end: vevent.endDate ? vevent.endDate.toString() : "Inconnu",
                    location: vevent.location || "Non précisé",
                    description: vevent.description || "Pas de description",
                    uid: vevent.uid || "Sans UID"
                };
            } catch (err) {
                console.error("Erreur lors du parsing d'un événement :", err);
                return null;
            }
        }).filter(event => event !== null);
    } catch (error) {
        console.error("Erreur lors du traitement du fichier .ics :", error);
        return [];
    }
};

export type CalendarEvent = {
    id: number;
    title: string;
    start: Date;
    end: Date;
    location: string;
    group: string;
    professor: string | string[];
};

export type Calendar = {
    events: CalendarEvent[];
}

export const getCalendarEvents = async (url: string) => {
    if (url === '') {
        console.log("❌ URL du calendrier non fournie !");
        return null;
    }
    let formatedCalendar: Calendar = { events: [] };
    let events = await loadICSFromURL(url);
    events = extractEvents(events);
    events.forEach((calEvent: any) => {
        let desc = calEvent.description.split('\n').filter((line: string) => line !== '');
        desc = desc.splice(0, desc.length - 1);
        for (let i = 0; i < desc.length; i++) {
            if ((desc[i].includes('TP') || desc[i].includes('TD')) && i != 0) {
                let temp = desc[i];
                desc[i] = desc[0];
                desc[0] = temp;
                break;
            }
        }

        formatedCalendar.events.push({
            id: calEvent.uid,
            title: calEvent.summary,
            start: new Date(calEvent.start),
            end: new Date(calEvent.end),
            location: calEvent.location,
            group: desc[0],
            professor: desc.splice(1)
        });
    });
    return formatedCalendar;
}
