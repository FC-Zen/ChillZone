import axios from 'axios';
import { z } from 'zod';
import { SessionContext } from '@contexts';
import { API_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
export const authenticateUser = async (formData: { login: string; password: string; }) => {
  console.log("User authentification");
  try {
    const response = await axios.post(
      `${API_URL}login/`,
      { login: formData.login, password: formData.password },
      { withCredentials: true }
    );

    if (response.status === 200) {
      if (response.data.type !== "user") {
        return { success: false, message: "Connexion non autorisée", data: null };
      } else {
        // 🔹 Récupérer les cookies `sessionid` et `csrftoken`
        const setCookieHeader = response.headers["set-cookie"]?.[0].split(/[,;]\s*/);
        console.log("Set-Cookie Header:", setCookieHeader);

        let sessionId: string | null = null;
        let csrfToken: string | null = null;

        if (setCookieHeader && Array.isArray(setCookieHeader)) {
          setCookieHeader.forEach((cookie) => {
            // Vérification du cookie "sessionid"
            if (cookie.startsWith("sessionid=")) {
              sessionId = cookie.split(";")[0].split("=")[1];
            }

            // Vérification du cookie "csrftoken"
            if (cookie.startsWith("csrftoken=")) {
              csrfToken = cookie.split(";")[0].split("=")[1];
            }
          });
        }

        console.log("Session ID:", sessionId);
        console.log("CSRF Token:", csrfToken);

        // 🔹 Stocker les valeurs dans le `SessionContext`
        if (sessionId && csrfToken) {
          const sessionContext = SessionContext.getInstance();
          sessionContext.setSession(sessionId, csrfToken);

          await AsyncStorage.setItem('sessionId', csrfToken);
          await AsyncStorage.setItem('csrfToken', csrfToken);
        }

        console.log("Email :", response.data.email);
        return { success: true, message: "Connexion réussie !", data: response.data };
      }
    } else if (response.status === 403) {
      return { success: false, message: "Vous êtes déjà connectés", data: null };
    } else if (response.status === 404) {
      return { success: false, message: "Identifiants incorrects", data: null };
    } else {
      throw new Error("Erreur de connexion");
    }
  } catch (error: any) {
    console.error("Erreur lors de l'authentification:", error.message);
    throw new Error(error.message);
  }
};

/**
 * Déconecte un utilisateur.
 *
 * @throws {Error} Si le CSRF Token est manquant ou qu'il y a un problème lors de la déconnexion.
 *
 * @returns {Promise<Object>} résultat de la déconnexion.
 */
export const logoutUser = async () => {
  try {
    // 🔹 Récupération du CSRF Token depuis le SessionContext
    const sessionContext = SessionContext.getInstance();
    const csrfToken = sessionContext.getCsrfToken();
    // Pour récupérer le Token de la session précédente
    // const crsfToken = await AsyncStorage.getItem('csrfToken');

    console.log("CSRF Token:", csrfToken); 

    if (!csrfToken) {
      return { success: false, message: "CSRF Manquant." };
    }

    // 🔹 Requête DELETE pour la déconnexion
    const response = await axios.delete(`${API_URL}login/`, {
      withCredentials: true,
      headers: {
        "X-CSRFToken": csrfToken,
      },
    });

    if (response.status === 204) {
      console.log("Utilisateur déconnecté avec succès.");

      // 🔹 Suppression des valeurs stockées dans SessionContext
      sessionContext.clearSession();

      return { success: true, message: "Déconnexion réussie." };
    } else {
      throw new Error("Échec de la déconnexion.");
    }
  } catch (error: any) {
    console.error("Erreur lors de la déconnexion :", error.message);
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
export const sendPasswordRecoveryEmail = async (formData: {
  email: string;
}) => {
  console.log("Envoi de l'email de vérification à ", formData.email);
  // Exemple d'une liste d'emails valides pour la simulation
  try {
    const response = await axios.post(
      `${API_URL}forget-password/`,
      { email: formData.email },
      { withCredentials: true }
    );
    if (response.status === 200) {
      console.log(`Email de récupération envoyé à : ${formData.email}`);
      return {
        success: true,
        message: 'Email de récupération envoyé avec succès !',
      };
    } else {
      throw new Error("L'email n'existe pas");
    }
  } catch (error: any) {
    console.error(
      "Erreur lors de l'envoi de l'email de récupération :",
      formData.email
    );
    throw new Error(error.message);
  }
};

// Schéma CNIL
const passwordSchema = z
  .string()
  .min(12, 'Le mot de passe doit contenir au moins 12 caractères.')
  .regex(
    /[A-Z]/,
    'Le mot de passe doit contenir au moins une lettre majuscule.'
  )
  .regex(
    /[a-z]/,
    'Le mot de passe doit contenir au moins une lettre minuscule.'
  )
  .regex(/[0-9]/, 'Le mot de passe doit contenir au moins un chiffre.')
  .regex(
    /[!@#$%^&*(),.?":{}|<>]/,
    'Le mot de passe doit contenir au moins un caractère spécial.'
  );

/**
 * Réinitialise le mdp du compte
 *
 * @param {string} formData: { email: string } - L'adresse email de l'utilisateur.
 * @throws {Error} Si l'email n'existe pas dans la base de données.
 *
 * @returns {Promise<Object>} Résultat de l'envoi de l'email.
 */
export const changePassword = async (formData: {
  email: string;
  inputPassword: string;
  inputVerifyPassword: string;
}) => {
  try {
    // Vérification de la correspondance des mots de passe
    if (formData.inputPassword !== formData.inputVerifyPassword) {
      throw new Error(
        'Le nouveau mot de passe et la confirmation ne correspondent pas.'
      );
    }

    // Validation des mots de passe via Zod
    passwordSchema.parse(formData.inputPassword);

    // Simule l'envoi de la demande de changement de mot de passe - ATTENTION A VOIR AVEC LE BACK LA DEMARCHE
    /*
    const response = await axios.post(URL, {
      newPassword: formData.inputPassword,
    });
    */

    console.log('Mot de passe changé avec succès pour l’utilisateur.');

    // Simule une réponse réussie
    return { success: true, message: 'Mot de passe changé avec succès !' };
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      console.error('Erreur de validation :', error.errors);
      throw new Error(error.errors.map((e) => e.message).join(' '));
    }
    console.error('Erreur lors du changement de mot de passe:', error.message);
    throw new Error(error.message);
  }
};
