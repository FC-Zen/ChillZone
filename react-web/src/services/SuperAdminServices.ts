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
        const response = await axios.get('http://localhost:3000/admin-restaurants/',  // A MODIF
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
        console.error("Erreur lors de la récupération des affiliations:", error.message);
        throw new Error(error.message);
    }
};

/**
 * Récupère la liste des restaurants qui veulent s'inscrire
 *
 * @throws {Error} Si la requête échoue.
 * 
 * @returns {Promise<Array>} Liste des affiliations.
 */
export const getOwnerRegistrations = async () => {
    try {
        const response = await axios.get('http://localhost:3000/admin-restaurants/',  // A MODIF
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
        console.error("Erreur lors de la récupération des affiliations:", error.message);
        throw new Error(error.message);
    }
};

/**
 * Change l'utilisateur (accepte ou refuse ou block)
 *
 * @throws {Error} Si la requête échoue.
 * 
 * @returns {Promise<Array>} Liste des affiliations.
 */
export const manageUser = async () => {
    try {
        const response = await axios.put('http://localhost:3000/admin-restaurants/',  // A MODIF
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
        console.error("Erreur lors de la récupération des affiliations:", error.message);
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
export const manageOwnerRegistration = async () => {
    try {
        const response = await axios.put('http://localhost:3000/admin-restaurants/',  // A MODIF
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
        console.error("Erreur lors de la récupération des affiliations:", error.message);
        throw new Error(error.message);
    }
};