import { API_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAccessToken } from "@utils/functions/Auth";
import axios from "axios";

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

    const access = await getAccessToken();

    try {
        let response = await axios.get(
            `${API_URL}calendar/`,
            {
                headers: {
                    Authorization: `Bearer ${access}`
                }
            }
        );

        if (response.status === 200) {
            formatedCalendar = {
                id: response.data.id,
                title: response.data.title,
                url: response.data.url,
                events: [],
            };
    
            for (const event of response.data.events) {
                let description = event.description.split(";");
                let group = description[0];
                let professor = description.splice(1).join('\n');
                formatedCalendar.events.push({
                    id: event.id,
                    title: event.title,
                    start_time: new Date(event.start_time),
                    end_time: new Date(event.end_time),
                    location: event.location,
                    group: group,
                    professor: professor,
                });
            }
        }

    } catch (error: any) {
        console.error("❌ Erreur lors de la récupération du calendrier :", error);
        return formatedCalendar;
    }

    return formatedCalendar;
}

/**
 * Envoie une requête de rafraichissement du calendrier
 * @returns {Promise<{ success: boolean, refreshTime: number, already: boolean }>} Résultat de la requête 
*/
export const refreshCalendar = async () => {
    const access = await getAccessToken();
    const user = await AsyncStorage.getItem('user') || '{}';
    try {
        const response = await axios.put(
            `${API_URL}calendar/`,
            {
                user: JSON.parse(user)
            },
            {
                headers: {
                    Authorization: `Bearer ${access}`
                }
            }
        );
        if (response.status === 200) {
            return { success: true, refreshTime: -1, already: false };
        }

        return { success: false, refreshTime: -1, already: false };
    } catch (error: any) {
        if (error.response.status === 400) {
            let message = error.response.data.error as string;
            message = message.split(' at ')[1];
            let date = new Date(message);
            let hours = date.getHours();
            let minutes = date.getMinutes();
            message = `${hours}h${minutes}`;
            return { success: false, refreshTime: message, already: true };
        }
        return { success: false, refreshTime: -1, already: false };
        
    }
}