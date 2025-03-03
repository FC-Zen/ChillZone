import axios from 'axios';
import { z } from 'zod';
import { API_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { refreshToken, verifyToken } from '@services';

/**
 * Test si on a déjà les informations de l'utilisateur en AsyncStorage.
 *
 *
 * @returns {Promise<Object>} résultat de l'authentification.
 */
export const testAuthentificate = async () => {
  const [access, refresh, userString] = await Promise.all([
      AsyncStorage.getItem('access'),
      AsyncStorage.getItem('refresh'),
      AsyncStorage.getItem('user')
  ]);

  if (access && refresh && userString) {
      console.log("Access testAuthentificate: ", access)
      console.log("Refresh testAuthentificate: ", refresh)
      const user = JSON.parse(userString);

      const isValid = await verifyToken(access);
      if (!isValid) {
          // Si le token est expiré, tente de le rafraîchir
          const refreshResult = await refreshToken(refresh);
          if (!refreshResult.success) {
              await AsyncStorage.clear(); // On wipe tout si le refresh échoue
              return { success: false, message: 'Session expirée, veuillez vous reconnecter', data: null };
          }
      }

      // Retourne le user avec un message de succès
      return { success: true, message: 'Bon retour à vous', data: user };
  }

  return { success: false, message: 'Pas d\'utilisateur enregistré', data: null };
};

/**
 * Authentifie un utilisateur en vérifiant ses informations de connexion.
 *
 * @param {Object} formData - Les données de connexion fournies par l'utilisateur. Contient le login et le password
 * @throws {Error} Si les informations de connexion (email ou mot de passe) sont incorrectes.
 *
 * @returns {Promise<Object>} résultat de l'authentification.
 */
export const authenticateUser = async (rememberMe:boolean, formData: { login: string; password: string }) => {
    try {
    const response = await axios.post( `${API_URL}login/` , {
      username: formData.login,
      password: formData.password,
    });
    if (response.status == 200) {
      if (response.data.type !== "user") {
        return { success: false, message: 'Connexion non autorisée', data: null};
      } else {

        await AsyncStorage.setItem('access', response.data.access);
        await AsyncStorage.setItem('refresh', response.data.refresh);
        await AsyncStorage.setItem('user', JSON.stringify(response.data));
        await AsyncStorage.setItem('remember', String(rememberMe));

        return { success: true, message: 'Connexion réussie !', data: response.data};
      }
    } 
    return { success: false, message: "Erreur lors de la connexion", data: null };
  } catch (error: any) {
    console.error('Erreur lors de l\'authentification:', error.message);
    if (error.status == 401) {
      return { success: false, message: "Identifiants incorrects", data: null };
    } else if (error.status == 403) {
      return { success: false, message: 'Vous êtes déjà connectés', data: null };
    } else if (error.status == 404) {
      return { success: false, message: 'Vous n\'êtes plus autorisé à vous connecter. Contactez un administrateur', data: null };
    }
    return { success: false, message: "Erreur lors de la connexion", data: null };
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

  const remember = await AsyncStorage.getItem('remember');

  if(remember && remember === "true"){
    return { success: true, message: 'On se souvient de l\'utilisateur' };
  }

  const [access, refresh] = await Promise.all([
    AsyncStorage.getItem('access'),
    AsyncStorage.getItem('refresh')
  ]);

  console.log("Access LogoutUser :", access);
  console.log("Refresh LogoutUser :", refresh);

  if(!access || !refresh){
    throw new Error("Pas de token pour acces ou refresh")
  }

  console.log("API url :", `${API_URL}logout/`);
  const response = await axios.post(`${API_URL}logout/`, 
    {
      refresh: `${refresh}`
    },
    { 
      headers: {
          Authorization: `Bearer ${access}`,
      },
    });
    
    if (response.status === 205) {
      console.log("Déconnexion réussie");
      
      await AsyncStorage.removeItem('access');
      await AsyncStorage.removeItem('refresh');
      await AsyncStorage.removeItem('user');
      
      
      return { success: true, message: 'Déconnexion réussie.' };
    } else if (response.status === 400) {
      console.error("Erreur de Déconnexion: ", response.data);

    }else {
      throw new Error('Échec de la déconnexion.');
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
      { email: formData.email }
    );
    console.log(response);
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