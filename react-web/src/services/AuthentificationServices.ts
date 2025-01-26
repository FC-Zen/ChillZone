import { User } from '@hooks';
import { getCSRFToken } from '@utils';
import axios from 'axios';
import { z } from 'zod';

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
      if (response.data.type == "user") {
        // Suppression session
        document.cookie = "sessionid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "csrftoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        return { success: false, message: 'Connexion non autorisée', data: null};
      } else {
        //console.log('Authentification réussie pour:', formData.login);
        return { success: true, message: 'Connexion réussie !', data: response.data};
      }
    } else if (response.status == 403) {
      return { success: false, message: 'Vous êtes déjà connectés', data: null };
    } else if (response.status == 404) {
      return { success: false, message: 'Identifiants incorrects', data: null };
    } else {
      throw new Error('Erreur de connexion');
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
    const response = await axios.post( 'http://localhost:3000/forget-password/' , {
      email: formData.email
    },
    {
      withCredentials: true,
    });
    // Vérifie si l'email est valide - SIMULATION
    if (response.status == 200) {
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
  formData: { uuid: string; inputPassword: string; inputVerifyPassword: string },
  t: Function
) => {
  try {
    // Vérification de la correspondance des mots de passe
    if (formData.inputPassword !== formData.inputVerifyPassword) {
      throw new Error(t('zod.passwordMismatch'));
    }
    // Validation des mots de passe via Zod
    passwordSchema(t).parse(formData.inputPassword);
    const response = await axios.put( 'http://localhost:3000/reset-password/' + formData.uuid , {
      password: formData.inputPassword,
      password_verified: formData.inputVerifyPassword,
    },
    {
      withCredentials: true,
    });
    if (response.status == 200) {
      return { success: true, message: 'Mot de passe changé avec succès pour l’utilisateur.' };
    } else if (response.status == 404) {
      return { success: false, message: 'Problème de token' };
    }
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
export const logoutUser = async (setUser: React.Dispatch<React.SetStateAction<User | null>>) => {
  try {
    console.log("Cookies avant la requête DELETE:", document);
    const response = await axios.delete('http://localhost:3000/login/', 
    { 
      withCredentials: true,
      headers: {
        'X-CSRFToken': getCSRFToken(),
      },
    } 
    );
    if (response.status === 204) {
      console.log('Utilisateur déconnecté avec succès.');
      localStorage.removeItem('user');
      setUser(null);
      document.cookie = "csrftoken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
      return { success: true, message: 'Déconnexion réussie.' };
    } else {
      throw new Error('Échec de la déconnexion.');
    }
  } catch (error: any) {
    console.error('Erreur lors de la déconnexion :', error.message);
    throw new Error(error.message);
  }
};