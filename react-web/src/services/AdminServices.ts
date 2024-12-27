import axios from 'axios';

/**
 * Supprime un utilisateur en envoyant une requête DELETE à l'API.
 *
 * @param {number} id - L'ID de l'utilisateur à supprimer.
 * @throws {Error} Si la requête échoue.
 * 
 * @returns {Promise<Object>} Réponse de l'API.
 */
export const deleteAccount = async (id: number) => {
    try {
        // AXIOS
        return { success: true };
    } catch (error: any) {
        console.error('Erreur lors de la suppression de l\'utilisateur:', error.message);
        throw new Error(error.message);
    }
};

/**
 * Met à jour le statut de l'utilisateur en envoyant une requête PUT à l'API.
 *
 * @param {number} id - L'ID de l'utilisateur à mettre à jour.
 * @param {string} status - Le nouveau statut (Verified ou Blocked).
 * @throws {Error} Si la requête échoue.
 * 
 * @returns {Promise<Object>} Réponse de l'API.
 */
export const toggleAccount = async (id: number, status: string) => {
    try {
        // AXIOS
        return { success: true };
    } catch (error: any) {
        console.error('Erreur lors de la mise à jour du statut de l\'utilisateur:', error.message);
        throw new Error(error.message);
    }
};

/**
   * Ajoute un utilisateur en envoyant une requête POST à l'API.
   *
   * @param {Object} formData - Les informations de l'utilisateur à ajouter.
   * @throws {Error} Si la requête échoue.
   * 
   * @returns {Promise<Object>} Réponse de l'API.
   */
export const addAccount = async (formData: {
    first_name: string;
    last_name: string;
    role: string;
    email: string;
    establishment: string;
    }) => {
    try {
        // AXIOS
        return { success: true };
    } catch (error: any) {
        console.error('Erreur lors de l\'ajout de l\'utilisateur:', error.message);
        throw new Error(error.message);
    }
};