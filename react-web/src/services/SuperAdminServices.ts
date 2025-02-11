import axios from 'axios';
import { getCSRFToken } from '@utils';

/**
 * Récupère la liste de TOUS LES COMPTES
 *
 * @throws {Error} Si la requête échoue.
 * 
 * @returns {Promise<Array>} Liste des affiliations.
 */
export const getUsersSuperAdmin = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}superadmin-users/`,  // A MODIF
            { 
                withCredentials: true,
                headers: {
                    'X-CSRFToken': getCSRFToken(),
                },
            } 
            );
            if (response.status == 200) {
                return response;
            }
    } catch (error: any) {
        console.error("Erreur lors de la récupération des affiliations:", error.message);
        throw new Error(error.message);
    }
};


/**
 * Récupère la liste de TOUTES LES DEMANDES
 *
 * @throws {Error} Si la requête échoue.
 * 
 * @returns {Promise<Array>} Liste des affiliations.
 */
export const getRequestsSuperAdmin = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}superadmin-requests/`,  // A MODIF
            { 
                withCredentials: true,
                headers: {
                    'X-CSRFToken': getCSRFToken(),
                },
            } 
            );
            if (response.status == 200) {
                return response;
            }
    } catch (error: any) {
        console.error("Erreur lors de la récupération des affiliations:", error.message);
        throw new Error(error.message);
    }
};

/**
 * Change l'utilisateur (accepte ou refuse ou block) bloque le compte
 *
 * @param {number} id - L'ID de l'utilisateur à mettre à jour.
 * @param {string} status - Le nouveau statut (Verified ou Blocked).
 * @throws {Error} Si la requête échoue.
 * 
 * @returns {Promise<Object>} Réponse de l'API.
 */
export const toggleAccountActive = async (id: number, is_active: boolean) => {
    try {
        const response = await axios.put(`${import.meta.env.VITE_REACT_APP_API_URL}superadmin-users/`, 
            {
                id : id,
                is_active : is_active
            },
            { 
                withCredentials: true,
                headers: {
                    'X-CSRFToken': getCSRFToken(),
                },
            } 
            );
            if (response.status == 200) {
                return response.data;
            }
    } catch (error: any) {
        console.error('Erreur lors de la mise à jour du statut de l\'utilisateur:', error.message);
        throw new Error(error.message);
    }
};

/**
 * Accepte ou refuse l'inscription
 *
 * @throws {Error} Si la requête échoue.
 * 
 * @returns {Promise<Array>} Liste des affiliations.
 */
export const manageOwnerRegistration = async (id: number) => {
    try {
        const response = await axios.put(`${import.meta.env.VITE_REACT_APP_API_URL}superadmin-requests/`,  // A MODIF
            {
                id : id
            },
            { 
                withCredentials: true,
                headers: {
                    'X-CSRFToken': getCSRFToken(),
                },
            } 
            );
            if (response.status == 200) {
                return response.data;
            }
    } catch (error: any) {
        console.error("Erreur lors de la récupération des demandes:", error.message);
        throw new Error(error.message);
    }
};


/**
 * Accepte ou refuse l'inscription
 *
 * @throws {Error} Si la requête échoue.
 * 
 * @returns {Promise<Array>} Liste des affiliations.
 */
export const deleteOwnerRegistration = async (id: number) => {
    try {
        const response = await axios.delete(`${import.meta.env.VITE_REACT_APP_API_URL}superadmin-requests/`,  // A MODIF
            { 
                data: { id: id },
                withCredentials: true,
                headers: {
                    'X-CSRFToken': getCSRFToken(),
                },
            } 
            );
            if (response.status == 200) {
                return response.data;
            }
    } catch (error: any) {
        console.error("Erreur lors de la récupération des demandes:", error.message);
        throw new Error(error.message);
    }
};