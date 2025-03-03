import { API_URL } from "@env";
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
  try {
    const response = await axios.get(
      `${API_URL}faq/`,
      { withCredentials: true }
    );

    // Vérifie si la réponse indique une réussite - SIMULATION
    if (response) {
      console.log('Faq données récupérer: ',response.data);

      return response.data as FaqCategory[];
    } else {
      throw new Error('Erreur Faq');
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};