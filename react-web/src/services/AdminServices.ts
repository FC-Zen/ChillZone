import { getToken } from '@utils';
import axios from 'axios';

/* Types specifiques au dashboards admins  */
export type MonthlyData = {
    month: number;
    count: number;
}

export type DashboardData = {
    reservations_per_month_current_year: MonthlyData[];
    reservations_per_month_previous_year: MonthlyData[];
    users_per_month_current_year: MonthlyData[];
    users_per_month_previous_year: MonthlyData[];
    connections_current_year: number;
    connections_percentage_change: number;
    reports_current_month: number;
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
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}admin-accounts/`, 
            {  
                headers: {
                    Authorization: `Bearer ${getToken()}`,
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
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}admin-dashboard/`, {
            headers: {
                Authorization: `Bearer ${getToken()}`,
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
        const response = await axios.put(`${import.meta.env.VITE_REACT_APP_API_URL}admin-accounts/`, 
            {
                id : id,
                is_block : is_block,
            },
            { 
                headers: {
                    Authorization: `Bearer ${getToken()}`,
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
        const response = await axios.put(`${import.meta.env.VITE_REACT_APP_API_URL}admin-accounts/`, 
            {
                id : id,
                is_active : is_active
            },
            { 
                headers: {
                    Authorization: `Bearer ${getToken()}`,
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
        const response = await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}admin-accounts/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${getToken()}`,
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
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}admin-rooms/`, 
        { 
            headers: {
                Authorization: `Bearer ${getToken()}`,
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
        const response = await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}admin-rooms/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${getToken()}`,
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
        const response = await axios.put(`${import.meta.env.VITE_REACT_APP_API_URL}admin-rooms/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${getToken()}`,
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
        const response = await axios.put(`${import.meta.env.VITE_REACT_APP_API_URL}admin-rooms/`, 
            {
                id : id,
                status : status,
            },
            {
                headers: {
                    Authorization: `Bearer ${getToken()}`,
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
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}admin-booking/`, 
            {  
                headers: {
                    Authorization: `Bearer ${getToken()}`,
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
export const getAdminMap = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}admin-mapfloor/`, 
            {
                headers: {
                    Authorization: `Bearer ${getToken()}`,
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
 * Récupère la liste des plans de l'établissement depuis l'API. ET FLOORS
 *
 * @throws {Error} Si la requête échoue.
 * 
 * @returns {Promise<Array>} Liste des salles.
 */
export const getAdminInfo = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}admin-information/`, 
            {
                headers: {
                    Authorization: `Bearer ${getToken()}`,
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
 * Met à jour une les informations de l'établissement en envoyant une requête PUT à l'API.
 *
 * @param {FormData} formData - Les nouvelles informations de la FAQ.
 * @throws {Error} Si la requête échoue.
 *
 * @returns {Promise<Object>} Réponse de l'API contenant les FAQ mises à jour.
 */
export const updateAdminInfo = async (formData: FormData): Promise<any> => {
    try {
        const response = await axios.put(`${import.meta.env.VITE_REACT_APP_API_URL}admin-information/`, formData, {
         
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${getToken()}`,
        },
        });
        console.log('Réponse de l\'API (mise à jour FAQ):', response);
        return response; // Renvoie les FAQ mises à jour
    } catch (error: any) {
        console.error('Erreur lors de la mise à jour de la FAQ:', error.message);
        throw new Error(error.response?.data?.message || error.message);
    }
};

/**
 * Ajoute un étage en envoyant une requête POST à l'API.
 *
 * @param {FormData} formData - Les informations de l'étage à ajouter.
 * @throws {Error} Si la requête échoue.
 *
 * @returns {Promise<Object>} Réponse de l'API contenant les étages mis à jour.
 */
export const addFloor = async (formData: FormData): Promise<any> => {
    try {
    const response = await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}admin-mapfloor/`, formData, {
         
        headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${getToken()}`,
        },
    });
    console.log("Réponse de l'API (ajout étage):", response);
    return response; // Renvoie les étages mis à jour
    } catch (error: any) {
    console.error("Erreur lors de l'ajout de l'étage:", error.message);
    throw new Error(error.response?.data?.message || error.message);
    }
};

/**
   * Met à jour un étage en envoyant une requête PUT à l'API.
   *
   * @param {FormData} formData - Les nouvelles informations de l'étage.
   * @throws {Error} Si la requête échoue.
   *
   * @returns {Promise<Object>} Réponse de l'API contenant les étages mis à jour.
   */
export const updateFloor = async (formData: FormData): Promise<any> => {
    try {
    const response = await axios.put(`${import.meta.env.VITE_REACT_APP_API_URL}admin-mapfloor/`, formData, {
         
        headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${getToken()}`,
        },
    });
    console.log("Réponse de l'API (mise à jour étage):", response);
    return response; // Renvoie les étages mis à jour
    } catch (error: any) {
    console.error("Erreur lors de la mise à jour de l'étage:", error.message);
    throw new Error(error.response?.data?.message || error.message);
    }
};

/**
   * Supprime un étage en envoyant une requête DELETE à l'API.
   *
   * @param {number} id - L'ID de l'étage à supprimer.
   * @throws {Error} Si la requête échoue.
   *
   * @returns {Promise<Object>} Réponse de l'API contenant les étages mis à jour.
   */
export const deleteFloor = async (id: number): Promise<any> => {
    try {
    const response = await axios.delete(`${import.meta.env.VITE_REACT_APP_API_URL}admin-mapfloor/`, {
        data: { id },
         
        headers: {
        Authorization: `Bearer ${getToken()}`,
        },
    });
    console.log("Réponse de l'API (suppression étage):", response);
    return response; // Renvoie les étages mis à jour
    } catch (error: any) {
    console.error("Erreur lors de la suppression de l'étage:", error.message);
    throw new Error(error.response?.data?.message || error.message);
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
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}admin-restaurants/`, 
            {
                headers: {
                    Authorization: `Bearer ${getToken()}`,
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
        const response = await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}admin-restaurants/`, 
            {
                id : id
            },
            {
                headers: {
                    Authorization: `Bearer ${getToken()}`,
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
        const response = await axios.delete(`${import.meta.env.VITE_REACT_APP_API_URL}admin-restaurants/`, 
            { 
                data: { id: id },
                 
                headers: {
                    Authorization: `Bearer ${getToken()}`,
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
 * Récupère la liste des signalements depuis l'API.
 *
 * @throws {Error} Si la requête échoue.
 * 
 * @returns {Promise<Array>} Liste des salles.
 */
export const getFAQ = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}admin-faq/`, 
            {
                headers: {
                    Authorization: `Bearer ${getToken()}`,
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
 * Ajoute une FAQ en envoyant une requête POST à l'API.
 *
 * @param {FormData} formData - Les informations de la FAQ à ajouter.
 * @throws {Error} Si la requête échoue.
 *
 * @returns {Promise<Object>} Réponse de l'API contenant les FAQ mises à jour.
 */
export const addFAQ = async (formData: FormData): Promise<any> => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}admin-faq/`, formData, {
         
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${getToken()}`,
        },
        });
        console.log('Réponse de l\'API (ajout FAQ):', response);
        return response.data; // Renvoie les FAQ mises à jour
    } catch (error: any) {
        console.error('Erreur lors de l\'ajout de la FAQ:', error.message);
        throw new Error(error.response?.data?.message || error.message);
    }
};

/**
 * Met à jour une FAQ en envoyant une requête PUT à l'API.
 *
 * @param {FormData} formData - Les nouvelles informations de la FAQ.
 * @throws {Error} Si la requête échoue.
 *
 * @returns {Promise<Object>} Réponse de l'API contenant les FAQ mises à jour.
 */
export const updateFAQ = async (formData: FormData): Promise<any> => {
    try {
        const response = await axios.put(`${import.meta.env.VITE_REACT_APP_API_URL}admin-faq/`, formData, {
         
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${getToken()}`,
        },
        });
        console.log('Réponse de l\'API (mise à jour FAQ):', response);
        return response.data; // Renvoie les FAQ mises à jour
    } catch (error: any) {
        console.error('Erreur lors de la mise à jour de la FAQ:', error.message);
        throw new Error(error.response?.data?.message || error.message);
    }
};

/**
 * Supprime une FAQ en envoyant une requête DELETE à l'API.
 *
 * @param {number} id - L'ID de la FAQ à supprimer.
 * @throws {Error} Si la requête échoue.
 *
 * @returns {Promise<Object>} Réponse de l'API contenant les FAQ mises à jour.
 */
export const deleteFAQ = async (id: number): Promise<any> => {
    try {
        const response = await axios.delete(`${import.meta.env.VITE_REACT_APP_API_URL}admin-faq/`, 
            { 
                data: { id: id },
                 
                headers: {
                    Authorization: `Bearer ${getToken()}`,
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
 * Récupère la liste des signalements depuis l'API.
 *
 * @throws {Error} Si la requête échoue.
 * 
 * @returns {Promise<Array>} Liste des salles.
 */
export const getNetworks = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}admin-network/`, 
            { 
                 
                headers: {
                    Authorization: `Bearer ${getToken()}`,
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
 * Ajoute une FAQ en envoyant une requête POST à l'API.
 *
 * @param {FormData} formData - Les informations de la FAQ à ajouter.
 * @throws {Error} Si la requête échoue.
 *
 * @returns {Promise<Object>} Réponse de l'API contenant les FAQ mises à jour.
 */
export const addNetwork = async (formData: FormData): Promise<any> => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}admin-network/`, formData, {
         
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${getToken()}`,
        },
        });
        console.log('Réponse de l\'API (ajout FAQ):', response);
        return response.data; // Renvoie les FAQ mises à jour
    } catch (error: any) {
        console.error('Erreur lors de l\'ajout de la FAQ:', error.message);
        throw new Error(error.response?.data?.message || error.message);
    }
};

/**
 * Met à jour une FAQ en envoyant une requête PUT à l'API.
 *
 * @param {FormData} formData - Les nouvelles informations de la FAQ.
 * @throws {Error} Si la requête échoue.
 *
 * @returns {Promise<Object>} Réponse de l'API contenant les FAQ mises à jour.
 */
export const updateNetwork= async (id: number, link_network: string): Promise<any> => {
    try {
        const response = await axios.put(`${import.meta.env.VITE_REACT_APP_API_URL}admin-network/`, 
            {
                id : id,
                link_network : link_network,
            },
            { 
                 
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                },
            } 
        );
        console.log('Réponse de l\'API (mise à jour FAQ):', response);
        return response.data; // Renvoie les FAQ mises à jour
    } catch (error: any) {
        console.error('Erreur lors de la mise à jour de la FAQ:', error.message);
        throw new Error(error.response?.data?.message || error.message);
    }
};

/**
 * Supprime une FAQ en envoyant une requête DELETE à l'API.
 *
 * @param {number} id - L'ID de la FAQ à supprimer.
 * @throws {Error} Si la requête échoue.
 *
 * @returns {Promise<Object>} Réponse de l'API contenant les FAQ mises à jour.
 */
export const deleteNetwork = async (id: number): Promise<any> => {
    try {
        const response = await axios.delete(`${import.meta.env.VITE_REACT_APP_API_URL}admin-network/`, 
            { 
                data: { id: id },
                 
                headers: {
                    Authorization: `Bearer ${getToken()}`,
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