import axios from 'axios';
import { z } from 'zod';

//Import des données statiques
import FAKE_URL from '@assets/data/faq.json';

export type FaqDetail = {
    question: string;
    answer: string;
};
  
export type FaqCategory = {
    category: string;
    faq_details: FaqDetail[];
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
    //Récupération des données de Faq de l'API
    //const response = await axios.get(URL);
    const response = FAKE_URL;

    // Vérifie si la réponse indique une réussite - SIMULATION
    if (response) {
      console.log('Faq données récupérer');

      return response as FaqCategory[];
    } else {
      throw new Error('Erreur Faq');
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};