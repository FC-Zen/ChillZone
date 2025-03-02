import { getAccessToken } from '@utils/functions';
import { API_URL } from '@env';
import axios from 'axios';
import { z } from 'zod';

/**
 * Récupère la liste des liens de l'établissement depuis l'API.
 *
 * @throws {Error} Si la requête échoue.
 *
 * @returns {Promise<Array>} Liste des salles.
 */
export const getLinksNetworks = async () => {
  try {
    const token = await getAccessToken();
    const response = await axios.get(`${API_URL}network/`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      return { data: response.data };
    } else {
      throw new Error('Erreur lors de la récupération des comptes');
    }
  } catch (error: any) {
    console.error('Erreur lors de la récupération des salles:', error.message);
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
 * Change le mdp du compte
 */
export const updatePassword = async (
  formData: {
    password_actual: string;
    password: string;
    confirmPassword: string;
  },
  t: Function
) => {
  try {
    if (formData.password !== formData.confirmPassword) {
      throw new Error(t('zod.passwordMismatch'));
    }

    passwordSchema(t).parse(formData.password);

    const token = await getAccessToken();
    const response = await axios.put(
      `${API_URL}change-password/`,
      {
        password: formData.password,
        password_actual: formData.password_actual,
        password_verified: formData.confirmPassword,
      },
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200) {
      return { success: true, message: 'Mot de passe changé avec succès.' };
    } else if (response.status === 404) {
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
 * Met à jour les informations utilisateur
 */
export const updateInfoUser = async (
  formData: { first_name: string; last_name: string; phone: string },
  t: Function
) => {
  try {
    const token = await getAccessToken();
    const response = await axios.put(
      `${API_URL}change-information-profil/`,
      {
        first_name: formData.first_name,
        last_name: formData.last_name,
        phone: formData.phone,
      },
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200) {
      return {
        success: true,
        message: 'Informations mises à jour avec succès.',
      };
    } else if (response.status === 404) {
      return { success: false, message: 'Problème de token' };
    }
  } catch (error: any) {
    console.error('Erreur lors de la mise à jour du profil:', error.message);
    throw new Error(error.message);
  }
};

/**
 * Met à jour les informations utilisateur
 */
export const changeProfilePicture = async (formData: FormData) => {
  try {
    console.log(formData);
    const token = await getAccessToken();
    const response = await axios.post(
      `${API_URL}change-information-profil/`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200) {
      return {
        success: true,
        message: 'Informations mises à jour avec succès.',
        data: response.data,
      };
    } else if (response.status === 404) {
      return { success: false, message: 'Problème de token' };
    }
  } catch (error: any) {
    console.error('Erreur lors de la mise à jour du profil:', error.message);
    throw new Error(error.message);
  }
};

/**
 * Supprime la photo de profil de l'utilisateur (reste à default profile)
 */
export const deleteProfilePicture = async () => {
  try {
    const token = await getAccessToken();

    const response = await axios.delete(
      `${API_URL}change-information-profil/`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200) {
      return {
        success: true,
        message: 'Photo de profil supprimée avec succès.',
        data: response.data,
      };
    } else if (response.status === 404) {
      return {
        success: false,
        message: 'Utilisateur non trouvé ou token invalide.',
      };
    }
  } catch (error: any) {
    console.error(
      'Erreur lors de la suppression de la photo de profil:',
      error.message
    );
    throw new Error(error.message);
  }
};
