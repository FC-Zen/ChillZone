import { API_URL } from "@env";
import { getAccessToken } from "@utils/functions";
import axios from "axios";

export type FaqDetail = {
    question: string;
    answer: string;
};
  
export type FaqCategory = {
    category: string;
    questions: FaqDetail[];
}

/**
 * Récupère les données de la Faq
 *
 * @throws {Error} Si les informations de connexion (email ou mot de passe) sont incorrectes.
 *
 * @returns {Promise<Object>} résultat de l'authentification.
 */
export const getFaq = async () => {
  const access = await getAccessToken();

  if(!access){
    console.error("Pas de token access")
    return [];
  }

  try {
    const response = await axios.get(`${API_URL}faq/`, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });

      // Vérifie si la réponse indique une réussite - SIMULATION
    if (response) {
      return response.data as FaqCategory[];
    } 
  } catch (error: any) {
    console.error('Erreur lors de la récupération des FAQ:', error.message);
  }
};