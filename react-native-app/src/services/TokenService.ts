import { API_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

/**
 * Vérifie si le token est valide.
 * 
 * @param accessToken
 * 
 * @returns {Promise<boolean>}
 */
export const verifyToken = async (access: string) => {
    try {
        const response = await axios.post(`${API_URL}verify`, {
            token: access
        });

        return response.status === 200;
    } catch (error) {
        console.error('Erreur lors de la vérification du token:', error);
        return false;
    }
};

/**
 * Rafraîchit le token si nécessaire.
 * 
 * @param refreshToken
 * 
 * @returns {Promise<{success: boolean, access?: string}>}
 */
export const refreshToken = async (refresh: string) => {
    try {
        const response = await axios.post(`${API_URL}refresh/`, {
            refresh: refresh
        });

        if (response.status === 200) {
            await AsyncStorage.setItem('access', response.data.access);
            return { success: true, newAccessToken: response.data.access };
        } else {
            return { success: false, message: 'Impossible de rafraîchir le token' };
        }
    } catch (error) {
        console.error('Erreur lors du refresh du token:', error);
        return { success: false, message: 'Erreur lors du refresh du token' };
    }
};