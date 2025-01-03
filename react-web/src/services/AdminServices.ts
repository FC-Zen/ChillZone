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



/**
 * Ajoute une salle en envoyant une requête POST à l'API.
 *
 * @param {Object} roomData - Les informations de la salle à ajouter.
 * @throws {Error} Si la requête échoue.
 * 
 * @returns {Promise<Object>} Réponse de l'API.
 */
export const addRoom = async (roomData: {
    name: string;
    description: string;
    capacity: number;
    floor: string;
    establishment: string;
    status: boolean;
}) => {
    try {
        // AXIOS
        return { success: true };
    } catch (error: any) {
        console.error('Erreur lors de l\'ajout de la salle:', error.message);
        throw new Error(error.message);
    }
};

/**
 * Met à jour les informations d'une salle en envoyant une requête PUT à l'API.
 *
 * @param {number} id - L'ID de la salle à mettre à jour.
 * @param {Object} roomData - Les nouvelles informations de la salle.
 * @throws {Error} Si la requête échoue.
 * 
 * @returns {Promise<Object>} Réponse de l'API.
 */
export const updateRoom = async (id: number, roomData: {
    name: string;
    description: string;
    capacity: number;
    floor: string;
    establishment: string;
    status: boolean;
}) => {
    try {
        // AXIOS
        return { success: true };
    } catch (error: any) {
        console.error('Erreur lors de la mise à jour de la salle:', error.message);
        throw new Error(error.message);
    }
};

/**
 * Récupère la liste des salles depuis l'API.
 *
 * @throws {Error} Si la requête échoue.
 * 
 * @returns {Promise<Array>} Liste des salles.
 */
export const getRooms = async () => {
    try {
        // Simule une réponse API
        return;
    } catch (error: any) {
        console.error("Erreur lors de la récupération des salles:", error.message);
        throw new Error(error.message);
    }
};

/**
 * Récupère la liste des utilisateurs depuis l'API.
 *
 * @throws {Error} Si la requête échoue.
 * 
 * @returns {Promise<Array>} Liste des salles.
 */
export const getAccounts = async () => {
    try {
        // Simule une réponse API
        return;
    } catch (error: any) {
        console.error("Erreur lors de la récupération des salles:", error.message);
        throw new Error(error.message);
    }
};

/**
 * Récupère la liste des signalements depuis l'API.
 *
 * @throws {Error} Si la requête échoue.
 * 
 * @returns {Promise<Array>} Liste des salles.
 */
export const getConflicts = async () => {
    try {
        // Simule une réponse API
        return;
    } catch (error: any) {
        console.error("Erreur lors de la récupération des salles:", error.message);
        throw new Error(error.message);
    }
};

/**
 * Récupère la liste des réservations depuis l'API.
 *
 * @throws {Error} Si la requête échoue.
 * 
 * @returns {Promise<Array>} Liste des salles.
 */
export const getReservations = async () => {
    try {
        // Simule une réponse API
        return;
    } catch (error: any) {
        console.error("Erreur lors de la récupération des salles:", error.message);
        throw new Error(error.message);
    }
};