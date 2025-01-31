import axios from 'axios';
import menus from '@assets/data/menus.json';
import { getCSRFToken } from '@utils';

/**
 * Récupère la liste des commandes depuis l'API.
 * 
 * @throws {Error} Si la requête échoue.
 * @returns {Promise<Array>} Liste des commandes.
 */
export const fetchCommands = async () => {
  try {
    //AXIOS
  } catch (error: any) {
    console.error('Erreur lors de la récupération des commandes:', error.message);
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
/*       const response = await fetch(`${API_BASE_URL}/commands/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ command_status: status }),
      });
  
      if (!response.ok) {
        throw new Error(`Erreur lors de la mise à jour du statut de la commande: ${response.statusText}`);
      }
      
      const updatedCommand = await response.json();
      return updatedCommand; // Retourne la commande mise à jour */
    } catch (error: any) {
      console.error('Erreur lors de la mise à jour de la commande:', error.message);
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
    const response = await axios.get('http://localhost:3000/owner-meals/', 
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
      const response = await axios.post('http://localhost:3000/owner-meals/', formData, {
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
      const response = await axios.put('http://localhost:3000/owner-meals/', formData, {
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
      const response = await axios.get('http://localhost:3000/owner-menus/', 
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
      const response = await axios.post('http://localhost:3000/owner-menus/', formData, {
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
      const response = await axios.put('http://localhost:3000/owner-menus/', formData, {
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
