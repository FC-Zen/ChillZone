import axios from 'axios';
import { getCSRFToken } from '@utils';

/* Types specifiques au dashboards owner  */
export type MonthlyData = {
  month: number;
  count: number;
}

export type OwnerDashboardData = {
  commands_per_month_current_year: MonthlyData[];
  commands_per_month_previous_year: MonthlyData[];
  revenue_per_month_current_year : MonthlyData[];
  revenue_per_month_previous_year : MonthlyData[];
  most_sold_meal : string;
  most_sold_menu : string;
  commands_completed_today: number;
  percentage_commands_completed_yesterday : number;
  commands_in_progress : number;
  status : boolean;
}

/**
 * Récupère le JSON concernant les données des dashboards admin pour les graphiques.
 *
 * @throws {Error} Si la requête échoue.
 * 
 * @returns {Promise<Array>} Liste des salles.
 */
export const getDashboardDataOwner = async (): Promise<OwnerDashboardData> => {
  try {
      const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}owner-dashboard/`, {
          withCredentials: true,
          headers: {
              'X-CSRFToken': getCSRFToken(),
          },
      });

      if (response.status === 200) {
          const data: OwnerDashboardData = response.data;
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
 * Met à jour le statut d'une commande dans l'API.
 * 
 * @param {boolean} status 
 * @throws {Error} Si la requête échoue.
 * @returns {Promise<any>} Réponse de l'API.
 */

export const updateRestaurantStatus = async (status: boolean) => {
  try {
      const response = await axios.put(`${import.meta.env.VITE_REACT_APP_API_URL}owner-dashboard/`, 
        {
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
            return response.status;
        }
} catch (error: any) {
    console.error('Erreur lors de la mise à jour du statut de l\'utilisateur:', error.message);
    throw new Error(error.message);
}
};


/**
 * Récupère la liste des plats depuis l'API.
 * 
 * @throws {Error} Si la requête échoue.
 * @returns {Promise<Array>} Liste des commandes.
 */
export const fetchCommands = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}owner-commands/`, 
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
    console.error('Erreur lors de la récupération des repas:', error.message);
    throw new Error(error.message);
  }
};

// services/commandsService.ts

/**
 * Met à jour le statut d'une commande dans l'API.
 * 
 * @param {number} id L'ID de la commande à mettre à jour.
 * @param {string} status Le nouveau statut de la commande.
 * @throws {Error} Si la requête échoue.
 * @returns {Promise<any>} Réponse de l'API.
 */

export const updateCommandStatus = async (id: number, status: string) => {
    try {
        const response = await axios.put(`${import.meta.env.VITE_REACT_APP_API_URL}owner-commands/`, 
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
              return response.data;
          }
  } catch (error: any) {
      console.error('Erreur lors de la mise à jour du statut de l\'utilisateur:', error.message);
      throw new Error(error.message);
  }
};
  
/**
 * Récupère la liste des plats depuis l'API.
 * 
 * @throws {Error} Si la requête échoue.
 * @returns {Promise<Array>} Liste des commandes.
 */
export const fetchMeals = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}owner-meals/`, 
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
    console.error('Erreur lors de la récupération des repas:', error.message);
    throw new Error(error.message);
  }
};

/**
 * Ajoute une salle en envoyant une requête POST à l'API.
 *
 * @param {Object} formData - Les informations de la salle à ajouter.
 * @throws {Error} Si la requête échoue.
 * 
 * @returns {Promise<Object>} Réponse de l'API.
 */
export const addMeal = async (formData: FormData): Promise<any> => {
  try {
      const response = await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}owner-meals/`, formData, {
          withCredentials: true,
          headers: {
              'Content-Type': 'multipart/form-data',
              'X-CSRFToken': getCSRFToken(),
          },
      });
      console.log('Réponse de l\'API:', response);
      return response.data;
  } catch (error: any) {
    console.error('Erreur lors de la récupération des repas:', error.message);
    throw new Error(error.message);
  }
};


/**
 * Ajoute une salle en envoyant une requête POST à l'API.
 *
 * @param {Object} formData - Les informations de la salle à ajouter.
 * @throws {Error} Si la requête échoue.
 * 
 * @returns {Promise<Object>} Réponse de l'API.
 */
export const updateMeal = async (formData: FormData): Promise<any> => {
  try {
      const response = await axios.put(`${import.meta.env.VITE_REACT_APP_API_URL}owner-meals/`, formData, {
          withCredentials: true,
          headers: {
              'Content-Type': 'multipart/form-data',
              'X-CSRFToken': getCSRFToken(),
          },
      });
      console.log('Réponse de l\'API:', response);
      return response.data;
  } catch (error: any) {
    console.error('Erreur lors de la récupération des repas:', error.message);
    throw new Error(error.message);
  }
};



/**
 * Récupère la liste des plats depuis l'API.
 * 
 * @throws {Error} Si la requête échoue.
 * @returns {Promise<Array>} Liste des commandes.
 */
export const fetchMenus = async () => {
  try {
      const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}owner-menus/`, 
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
    console.error('Erreur lors de la récupération des commandes:', error.message);
    throw new Error(error.message);
  }
};

/**
 * Ajoute une salle en envoyant une requête POST à l'API.
 *
 * @param {Object} formData - Les informations de la salle à ajouter.
 * @throws {Error} Si la requête échoue.
 * 
 * @returns {Promise<Object>} Réponse de l'API.
 */
export const addMenu = async (formData: FormData): Promise<any> => {
  try {
      const response = await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}owner-menus/`, formData, {
          withCredentials: true,
          headers: {
              'Content-Type': 'multipart/form-data',
              'X-CSRFToken': getCSRFToken(),
          },
      });
      console.log('Réponse de l\'API:', response);
      return response.data;
  } catch (error: any) {
    console.error('Erreur lors de la récupération des repas:', error.message);
    throw new Error(error.message);
  }
};


/**
 * Ajoute une salle en envoyant une requête POST à l'API.
 *
 * @param {Object} formData - Les informations de la salle à ajouter.
 * @throws {Error} Si la requête échoue.
 * 
 * @returns {Promise<Object>} Réponse de l'API.
 */
export const updateMenu = async (formData: FormData): Promise<any> => {
  try {
      const response = await axios.put(`${import.meta.env.VITE_REACT_APP_API_URL}owner-menus/`, formData, {
          withCredentials: true,
          headers: {
              'Content-Type': 'multipart/form-data',
              'X-CSRFToken': getCSRFToken(),
          },
      });
      console.log('Réponse de l\'API:', response);
      return response.data;
  } catch (error: any) {
    console.error('Erreur lors de la récupération des repas:', error.message);
    throw new Error(error.message);
  }
};

/**
 * Récupère la liste des établissements depuis l'API.
 * 
 * @throws {Error} Si la requête échoue.
 * @returns {Promise<Array>} Liste des commandes.
 */
export const getEstablishments = async () => {
  try {
      const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}create-owner-account/`, 
      );
      if (response.status == 200) {
          return response.data;
      }
  } catch (error: any) {
    console.error('Erreur lors de la récupération des commandes:', error.message);
    throw new Error(error.message);
  }
};

/**
 * Ajoute une salle en envoyant une requête POST à l'API.
 *
 * @param {Object} formData - Les informations de la salle à ajouter.
 * @throws {Error} Si la requête échoue.
 * 
 * @returns {Promise<Object>} Réponse de l'API.
 */
export const addOwnerInscription = async (formData: FormData): Promise<any> => {
  try {
      const response = await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}create-owner-account/`, formData);
      console.log('Réponse de l\'API:', response);
      return response.data;
  } catch (error: any) {
    console.error('Erreur lors de la récupération des repas:', error.message);
    throw new Error(error.message);
  }
};

