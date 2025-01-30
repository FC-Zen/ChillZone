import axios from 'axios';
import maps from '@assets/data/maps.json';
import { getCSRFToken } from '@utils';

export type Floor = {
    floor_id: number;
    floor_number: number;
    floor_name: string;
    floor_plan: string;
}

/* Types specifiques au dashboards admins  */
export type MonthlyData = {
    month: number;
    count: number;
}

export type DashboardData = {
    reservations_per_month_current_year: MonthlyData[];
    reservations_per_month_previous_year: MonthlyData[];
    connections_per_month_current_year: MonthlyData[];
    connections_per_month_previous_year: MonthlyData[];
    users_current_year: number;
    users_previous_year: number;
    users_percentage_change: number;
    reports_current_month: number;
    reports_previous_month: number;
    reports_percentage_change: number;
    available_locations: number;
    available_restaurants: number;
}

/**
 * Récupère la liste des utilisateurs depuis l'API.
 *
 * @throws {Error} Si la requête échoue.
 * 
 * @returns {Promise<Array>} Liste des salles.
 */
export const getAccounts = async () => {
    try {
        const response = await axios.get('http://localhost:3000/admin-accounts/', 
            { withCredentials: true,
                headers: {
                    'X-CSRFToken': getCSRFToken(),
                },
            } 
        );        
        if (response.status == 200) {
            return { data : response.data };
        } else {
            throw new Error('Erreur lors de la récupération des comptes');
        }
    } catch (error: any) {
        console.error("Erreur lors de la récupération des salles:", error.message);
        throw new Error(error.message);
    }
};

/**
 * Récupère le JSON concernant les données des dashboards admin pour les graphiques.
 *
 * @throws {Error} Si la requête échoue.
 * 
 * @returns {Promise<Array>} Liste des salles.
 */
export const getDashboardData = async (): Promise<DashboardData> => {
    try {
        const response = await axios.get('http://localhost:3000/admin-dashboard/', {
            withCredentials: true,
            headers: {
                'X-CSRFToken': getCSRFToken(),
            },
        });

        if (response.status === 200) {
            const data: DashboardData = response.data;
            return data; // Retourne un tableau contenant l'objet
        } else {
            throw new Error('Erreur lors de la récupération des comptes');
        }
    } catch (error: any) {
        console.error("Erreur lors de la récupération des données de Dashboards:", error.message);
        throw new Error(error.message);
    }
};

/**
 * Met à jour le statut de l'utilisateur en envoyant une requête PUT à l'API. Bloque les résa ou bloque le compte
 *
 * @param {number} id - L'ID de l'utilisateur à mettre à jour.
 * @param {string} status - Le nouveau statut (Verified ou Blocked).
 * @throws {Error} Si la requête échoue.
 * 
 * @returns {Promise<Object>} Réponse de l'API.
 */
export const toggleAccountBlock = async (id: number, is_block: boolean) => {
    try {
        const response = await axios.put('http://localhost:3000/admin-accounts/', 
            {
                id : id,
                is_block : is_block,
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
 * Met à jour le statut de l'utilisateur en envoyant une requête PUT à l'API. Bloque les résa ou bloque le compte
 *
 * @param {number} id - L'ID de l'utilisateur à mettre à jour.
 * @param {string} status - Le nouveau statut (Verified ou Blocked).
 * @throws {Error} Si la requête échoue.
 * 
 * @returns {Promise<Object>} Réponse de l'API.
 */
export const toggleAccountActive = async (id: number, is_active: boolean) => {
    try {
        const response = await axios.put('http://localhost:3000/admin-accounts/', 
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
   * Ajoute un utilisateur en envoyant une requête POST à l'API.
   *
   * @param {Object} formData - Les informations de l'utilisateur à ajouter.
   * @throws {Error} Si la requête échoue.
   * 
   * @returns {Promise<Object>} Réponse de l'API.
   */
export const addAccount = async (formData: FormData): Promise<any> => {
    try {
        const response = await axios.post('http://localhost:3000/admin-accounts/', formData, {
            withCredentials: true,
            headers: {
                'Content-Type': 'multipart/form-data',
                'X-CSRFToken': getCSRFToken(),
            },
        });
        if (response.status == 200) {
            return response.data;
        }
    } catch (error: any) {
        console.error('Erreur lors de l\'ajout de l\'utilisateur:', error.message);
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
        const response = await axios.get('http://localhost:3000/admin-rooms/', 
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
        console.error("Erreur lors de la récupération des salles:", error.message);
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
export const addRoom = async (formData: FormData): Promise<any> => {
    try {
        const response = await axios.post('http://localhost:3000/admin-rooms/', formData, {
            withCredentials: true,
            headers: {
                'Content-Type': 'multipart/form-data',
                'X-CSRFToken': getCSRFToken(),
            },
        });
        console.log('Réponse de l\'API:', response);
        return response.data.locations;
    } catch (error: any) {
        console.error('Erreur lors de l\'ajout de la salle:', error.message);
        throw new Error(error.response?.data?.message || error.message);
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
export const updateRoom = async (formData: FormData): Promise<any> => {
    try {
        const response = await axios.put('http://localhost:3000/admin-rooms/', formData, {
            withCredentials: true,
            headers: {
                'Content-Type': 'multipart/form-data',
                'X-CSRFToken': getCSRFToken(),
            },
        });
        console.log('Réponse de l\'API:', response);
        return response.data.locations;
    } catch (error: any) {
        console.error('Erreur lors de la mise à jour de la salle:', error.message);
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
export const toggleRoom = async (id: number, status: boolean) => {
    try {
        const response = await axios.put('http://localhost:3000/admin-rooms/', 
            {
                id : id,
                status : status,
            },
            { 
                withCredentials: true,
                headers: {
                    'X-CSRFToken': getCSRFToken(),
                },
            } 
            );
            if (response.status == 200) {
                return response.data.locations;
            }
    } catch (error: any) {
        console.error('Erreur lors de la mise à jour du statut de l\'utilisateur:', error.message);
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
export const getConflictsaAndReservations = async () => {
    try {
        const response = await axios.get('http://localhost:3000/admin-booking/', 
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
        console.error("Erreur lors de la récupération des salles:", error.message);
        throw new Error(error.message);
    }
};


/**
 * Récupère la liste des plans de l'établissement depuis l'API. ET FLOORS
 *
 * @throws {Error} Si la requête échoue.
 * 
 * @returns {Promise<Array>} Liste des salles.
 */
export const getListInputsValues = async () => {
    try {
        const response = await axios.get('http://localhost:3000/admin-map/', 
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
        console.error("Erreur lors de la récupération des plans:", error.message);
        throw new Error(error.message);
    }
};

/**
 * Récupère la liste des restaurants affiliés
 *
 * @throws {Error} Si la requête échoue.
 * 
 * @returns {Promise<Array>} Liste des affiliations.
 */
export const getAffiliations = async () => {
    try {
        const response = await axios.get('http://localhost:3000/admin-restaurants/', 
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
 * Accepte la demande d'affiliation de restaurant
 *
 * @throws {Error} Si la requête échoue.
 * 
 * @returns {Promise<Array>} Liste des affiliations.
 */
export const acceptAffiliations = async (id: number) => {
    try {
        const response = await axios.post('http://localhost:3000/admin-restaurants/', 
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
        console.error("Erreur lors de la récupération des affiliations:", error.message);
        throw new Error(error.message);
    }
};

/**
 * Refuse la demande ou supprime le lien
 *
 * @throws {Error} Si la requête échoue.
 * 
 * @returns {Promise<Array>} Liste des affiliations.
 */
export const deleteAffiliations = async (id: number) => {
    try {
        const response = await axios.delete('http://localhost:3000/admin-restaurants/', 
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
        console.error("Erreur lors de la récupération des affiliations:", error.message);
        throw new Error(error.message);
    }
};