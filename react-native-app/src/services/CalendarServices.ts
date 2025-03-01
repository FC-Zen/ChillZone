import { API_URL } from "@env";
import axios from "axios";
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
    start_time: Date;
    end_time: Date;
    location: string;
    group: string;
    professor: string | string[];
};

export type Calendar = {
    id: number;
    title: string;
    url: string;
    events: CalendarEvent[];
}

const formatDescription = (description: string) => {
    let desc = description.split('\n').filter((line: string) => line !== '');
    let group = '';
    let professor = '';
    desc = desc.splice(0, desc.length - 1);
    for (let i = 0; i < desc.length; i++) {
        if ((desc[i].includes('TP') || desc[i].includes('TD')) && i != 0) {
            let temp = desc[i];
            desc[i] = desc[0];
            desc[0] = temp;
            break;
        }
    }
    group = desc[0];
    professor = desc.splice(1).join('\n');
    return { group, professor };
}

/**
 * Enregistre le lien du calendrier dans la base de données de l'utilisateur
 * @param {string} url Le lien du calendrier
 * @throws {Error} Si le lien est vide
*/
export const setCalendarLink = async (url: string) => {
    if (!url) {
        console.error("❌ Lien du calendrier vide.");
        throw new Error("Le lien du calendrier ne peut pas être vide.");
    }
    try {
        await axios.post(
            `${API_URL}/calendar`,
            { url },
            { withCredentials: true }
        );
    } catch (error: any) {
        console.error("❌ Erreur lors de la sauvegarde du lien du calendrier :", error);
    }
}

/**
 * Récupère les événements du calendrier
 * @returns {Promise<Calendar>} Le calendrier
*/
export const getCalendarEvents = async () => {

    let formatedCalendar: Calendar = {
        id: 0,
        title: "Calendrier",
        url: "",
        events: []
     };

    let description = {
        group: '',
        professor: '',
    };

    try {
        const response = await axios.get(
            `${API_URL}/calendar`,
            { withCredentials: true }
        );

        formatedCalendar = {
            id: response.data.id,
            title: response.data.title,
            url: response.data.url,
            events: [],
        };

        for (const event of response.data.events) {
            description = formatDescription(event.description);
            formatedCalendar.events.push({
                id: event.id,
                title: event.title,
                start_time: new Date(event.start_time),
                end_time: new Date(event.end_time),
                location: event.location,
                group: description.group,
                professor: description.professor,
            });
        }

    } catch (error: any) {
        console.error("❌ Erreur lors de la récupération du calendrier :", error);
        return formatedCalendar;
    }

    return formatedCalendar;
}
