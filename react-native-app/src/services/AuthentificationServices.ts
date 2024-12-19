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
export const authenticateUser = async (formData: {
  login: string;
  password: string;
}) => {
  try {
    /* Envoi des données d'authentification à l'API
    const response = await axios.post( URL , {
      login: formData.login,
      password: formData.password,
    });
    */
    // Vérifie si la réponse indique une réussite - SIMULATION
    if (formData.login == validEmail && formData.password == validPassword) {
      console.log('Authentification réussie pour:', formData.login);
      return { success: true, message: 'Connexion réussie !' };
    } else {
      throw new Error('Email ou mot de passe incorrect');
    }
  } catch (error: any) {
    console.error("Erreur lors de l'authentification:", error.message);
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
  // Exemple d'une liste d'emails valides pour la simulation
  try {
    /* Envoi des données à l'API
    const response = await axios.post( URL , {
      email,
    });
    */
    // Vérifie si l'email est valide - SIMULATION
    if (validEmails.includes(formData.email)) {
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
