import { Data } from '@assets';
import { z } from 'zod';

const validEmail = Data.user_test.email; // Exemple d'email
const validPassword = Data.user_test.password; // Exemple de mot de passe

// Service d'authentification
export const authenticateUser = async (email: string, password: string) => {
  const formData = {
    email: email,
    password: password,
  };

  // Vérification des informations d'authentification
  if (formData.email !== validEmail || formData.password !== validPassword) {
    throw new Error('Email ou mot de passe incorrect');
  }

  console.log('Authentification réussie pour:', formData.email);
  return { success: true, message: 'Connexion réussie !' };
};

// Service de demande de réinitialisation de mot de passe
export const requestPasswordReset = async (email: string) => {
  const formData = { email: email };

  if (formData.email !== validEmail) {
    throw new Error('Email non trouvé');
  }

  // Simuler la génération d'un token unique
  const resetToken = 'token-' + Math.random().toString(36).substr(2, 9);

  // Simulation d'envoi d'email avec lien
  const resetLink = `https://votreapp.com/reset-password?token=${resetToken}`;
  console.log('Email envoyé à:', formData.email);
  console.log('Lien de réinitialisation:', resetLink);

  return {
    success: true,
    message: 'Un email de réinitialisation a été envoyé à votre adresse',
  };
};

// Schéma Zod pour la réinitialisation du mot de passe
const resetPasswordSchema = z
  .object({
    token: z.string().startsWith('token-', {
      message: 'Lien de réinitialisation invalide ou expiré',
    }),
    newPassword: z
      .string()
      .min(12, {
        message: 'Le mot de passe doit contenir au moins 12 caractères',
      })
      .max(16, {
        message: 'Le mot de passe ne doit pas dépasser 16 caractères',
      })
      .regex(/[A-Z]/, {
        message: 'Le mot de passe doit contenir au moins une lettre majuscule',
      })
      .regex(/[^a-zA-Z0-9]/, {
        message: 'Le mot de passe doit contenir au moins un caractère spécial',
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Les mots de passe ne correspondent pas',
    path: ['confirmPassword'],
  });

export const resetPassword = async (
  token: string,
  newPassword: string,
  confirmPassword: string
) => {
  try {
    // Valider les données d'entrée avec Zod
    const formData = resetPasswordSchema.parse({
      token,
      newPassword,
      confirmPassword,
    });

    // Si la validation passe, continuer le processus
    console.log(
      'Mot de passe réinitialisé avec succès pour le token:',
      formData.token
    );

    return {
      success: true,
      message: 'Votre mot de passe a été réinitialisé avec succès',
    };
  } catch (error) {
    // Gestion des erreurs Zod
    if (error instanceof z.ZodError) {
      throw new Error(error.errors.map((err) => err.message).join(', '));
    }
    throw error;
  }
};
