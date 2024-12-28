import axios from 'axios';

/**
 * Déconnecte l'utilisateur en appelant l'API appropriée.
 *
 * @returns {Promise<Object>} Résultat de la déconnexion.
 * @throws {Error} Si une erreur se produit lors de la déconnexion.
 */
export const logoutUser = async () => {
  try {
    // Appel à l'API de déconnexion (remplacez `URL` par l'endpoint réel)
    /*
    const response = await axios.post('URL/logout');
    */

    console.log('Utilisateur déconnecté avec succès.');
    // Simule une réponse réussie
    return { success: true, message: 'Déconnexion réussie.' };
  } catch (error: any) {
    console.error('Erreur lors de la déconnexion :', error.message);
  }
};
