import { getCSRFToken } from '@utils';
import axios from 'axios';
import { z } from 'zod';

// Exemples d'authentification
const validEmail = 'user@example.com';
const validPassword = 'password123'; // Exemple de mot de passe
const validEmails = ['user@example.com', 'admin@example.com'];

/**
 * Authentifie un utilisateur en vérifiant ses informations de connexion.
 *
 * @param {Object} formData - Les données de connexion fournies par l'utilisateur. Contient le login et le password
 * @throws {Error} Si les informations de connexion (email ou mot de passe) sont incorrectes.
 *
 * @returns {Promise<Object>} résultat de l'authentification.
 */
export const authenticateUser = async (formData: { login: string; password: string }) => {
  try {
    const response = await axios.post( 'http://localhost:3000/login/' , {
      login: formData.login,
      password: formData.password,
    },
    {
      withCredentials: true,
    });
    // Vérifie si la réponse indique une réussite - SIMULATION
    if (response.status == 200) {
      console.log('Authentification réussie pour:', formData.login);
      return { success: true, message: 'Connexion réussie !', data: response.data };
    } else {
      throw new Error('Email ou mot de passe incorrect');
    }
  } catch (error: any) {
    console.error('Erreur lors de l\'authentification:', error.message);
    throw new Error(error.message);
  }
};

/**
 * Envoie un email pour la récupération du mot de passe.
 *
 * @param {string} formData: { email: string } - L'adresse email de l'utilisateur.
 * @throws {Error} Si l'email n'existe pas dans la base de données.
 *
 * @returns {Promise<Object>} Résultat de l'envoi de l'email.
 */
export const sendPasswordRecoveryEmail = async (formData: { email: string }) => {
  // Exemple d'une liste d'emails valides pour la simulation
  try {
    /* Envoi des données à l'API
    const response = await axios.post( URL , {
      email,
    });
    */
    // Vérifie si l'email est valide - SIMULATION
    if (validEmails.includes(formData.email)) {
      return { success: true, message: 'Email de récupération envoyé avec succès !' };
    } else {
      throw new Error("L'email n'existe pas");
    }
  } catch (error: any) {
    console.error('Erreur lors de l\'envoi de l\'email de récupération :', formData.email);
    throw new Error(error.message);
  }
};

// Schéma CNIL
const passwordSchema = (t: Function) =>
  z
    .string()
    .min(12, t('zod.minLength'))
    .regex(/[A-Z]/, t('zod.uppercase'))
    .regex(/[a-z]/, t('zod.lowercase'))
    .regex(/[0-9]/, t('zod.number'))
    .regex(/[!@#$%^&*(),.?":{}|<>]/, t('zod.specialChar'));

/**
 * Réinitialise le mdp du compte
 *
 * @param {string} formData: { email: string } - L'adresse email de l'utilisateur.
 * @param {Function} t - Fonction de traduction de react-i18next
 * @throws {Error} Si l'email n'existe pas dans la base de données.
 *
 * @returns {Promise<Object>} Résultat de l'envoi de l'email.
 */
export const changePassword = async (
  formData: { email: string; inputPassword: string; inputVerifyPassword: string },
  t: Function
) => {
  try {
    // Vérification de la correspondance des mots de passe
    if (formData.inputPassword !== formData.inputVerifyPassword) {
      throw new Error(t('zod.passwordMismatch'));
    }

    // Validation des mots de passe via Zod
    passwordSchema(t).parse(formData.inputPassword);

    // Simule l'envoi de la demande de changement de mot de passe - ATTENTION A VOIR AVEC LE BACK LA DEMARCHE
    /*
    const response = await axios.post(URL, {
      newPassword: formData.inputPassword,
    });
    */

    console.log('Mot de passe changé avec succès pour l’utilisateur.');

    // Simule une réponse réussie
    return { success: true, message: t('passwordChange.success') };
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      console.error('Erreur de validation :', error.errors);
      throw new Error(error.errors.map((e) => e.message).join(' '));
    }
    console.error('Erreur lors du changement de mot de passe:', error.message);
    throw new Error(error.message);
  }
};

/**
 * Déconnecte l'utilisateur en appelant l'API appropriée.
 *
 * @returns {Promise<Object>} Résultat de la déconnexion.
 * @throws {Error} Si une erreur se produit lors de la déconnexion.
 */
export const logoutUser = async () => {
  try {
    console.log("Cookies avant la requête DELETE:", document);
    const response = await axios.delete('http://localhost:3000/login/', 
    { withCredentials: true,
      headers: {
        'X-CSRFToken': getCSRFToken(),
      },
    } 
    );
    if (response.status === 204) {
      console.log('Utilisateur déconnecté avec succès.');
      localStorage.removeItem('user');
      return { success: true, message: 'Déconnexion réussie.' };
    } else {
      throw new Error('Échec de la déconnexion.');
    }
  } catch (error: any) {
    console.error('Erreur lors de la déconnexion :', error.message);
    throw new Error(error.message);
  }
};