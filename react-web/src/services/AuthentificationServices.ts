import { User } from '@hooks';
import { getTokenAccess , getTokenRefresh } from '@utils';
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
    const response = await axios.post( `${import.meta.env.VITE_REACT_APP_API_URL}login/` , {
      username: formData.login,
      password: formData.password,
    },
    {
       
    });
    if (response.status == 200) {
      if (response.data.type == "user") {
        return { success: false, message: 'Connexion non autorisée', data: null};
      } else {

        localStorage.setItem('access', response.data.access);
        localStorage.setItem('refresh', response.data.refresh);

        return { success: true, message: 'Connexion réussie !', data: response.data};
      }
    } else if (response.status == 401) {
      return { success: false, message: "Vous n'êtes plus autorisé à vous connecter. Contactez un administrateur", data: null };
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
    const response = await axios.post( `${import.meta.env.VITE_REACT_APP_API_URL}forget-password/` , {
      email: formData.email
    },
    {
       
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
    const response = await axios.put( `${import.meta.env.VITE_REACT_APP_API_URL}reset-password/` + formData.uuid , {
      password: formData.inputPassword,
      password_verified: formData.inputVerifyPassword,
    },
    {
       
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
    const response = await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}logout/`, 
      {
        refresh: `${getTokenRefresh()}`
      },
      { 
        headers: {
            Authorization: `Bearer ${getTokenAccess()}`,
        },
      }
      );
      
      if (response.status === 205) {
        localStorage.removeItem('user');
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        setUser(null);
        return { success: true, message: 'Déconnexion réussie.' };
      } else {
        throw new Error('Échec de la déconnexion.');
      }
  } catch (error: any) {
    console.error('Erreur lors de la déconnexion :', error.message);
    throw new Error(error.message);
  }
};