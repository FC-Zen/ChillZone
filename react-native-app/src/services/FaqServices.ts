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
  console.log("récupération de Faq")
  const access = await getAccessToken();

  console.log("Access FAQ : ", access);
  if(!access){
    console.error("Pas de token access")
    return [];
  }
  console.log("Access FAQ : ", access);

  try {
    const response = await axios.get(`${API_URL}faq/`, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });

      // Vérifie si la réponse indique une réussite - SIMULATION
    if (response) {
      console.log('Faq données récupérer: ',response.data);

      return response.data as FaqCategory[];
    } 
  } catch (error: any) {
    console.error('Erreur lors de la récupération des FAQ:', error.message);
  }
};