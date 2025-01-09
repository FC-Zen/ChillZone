export const accountServices = {
  /**
   * Met à jour les informations utilisateur.
   * @param {Object} userInfo - Les informations utilisateur à mettre à jour.
   * @param {string} userInfo.firstName - Le prénom de l'utilisateur.
   * @param {string} userInfo.lastName - Le nom de famille de l'utilisateur.
   * @param {string} userInfo.phone - Le téléphone de l'utilisateur.
   * @param {string} userInfo.email - L'email de l'utilisateur.
   * @returns {Promise<void>} - Une promesse qui indique que les informations ont été mises à jour.
   */
  updateUserInfo: async (userInfo: {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
  }): Promise<void> => {
    try {
      // Exemple : envoyer les données mises à jour à une API
      const response = await fetch('https://api.example.com/user/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userInfo),
      });

      if (!response.ok) {
        throw new Error('Failed to update user info');
      }

      console.log('User info updated successfully');
    } catch (error) {
      console.error('Error updating user info:', error);
      throw error;
    }
  },

  /**
   * Valide les informations utilisateur.
   * @param {Object} userInfo - Les informations utilisateur à valider.
   * @returns {boolean} - True si les informations sont valides, sinon false.
   */
  validateUserInfo: (userInfo: {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
  }): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (!userInfo.firstName.trim()) {
      console.error('First name is required');
      return false;
    }

    if (!userInfo.lastName.trim()) {
      console.error('Last name is required');
      return false;
    }

    if (!emailRegex.test(userInfo.email)) {
      console.error('Invalid email format');
      return false;
    }

    if (!phoneRegex.test(userInfo.phone)) {
      console.error('Invalid phone number format');
      return false;
    }

    return true;
  },

  /**
   * Vérifie si un mot de passe respecte les critères de validation.
   * @param {string} password - Le mot de passe à valider.
   * @returns {boolean} - True si le mot de passe est valide, sinon False.
   */
  validatePassword: (password: string): boolean => {
    const minLength = password.length >= 12;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[@$!%*?&]/.test(password);

    return (
      minLength &&
      hasUppercase &&
      hasLowercase &&
      hasNumber &&
      hasSpecialChar
    );
  },

  /**
   * Met à jour le mot de passe utilisateur.
   * @param {string} oldPassword - L'ancien mot de passe.
   * @param {string} newPassword - Le nouveau mot de passe.
   * @returns {Promise<void>} - Une promesse qui indique que le mot de passe a été mis à jour.
   */
  updatePassword: async (oldPassword: string, newPassword: string): Promise<void> => {
    try {
      const response = await fetch('https://api.example.com/user/change-password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ oldPassword, newPassword }),
      });

      if (!response.ok) {
        throw new Error('Failed to update password');
      }

      console.log('Password updated successfully');
    } catch (error) {
      console.error('Error updating password:', error);
      throw error;
    }
  },

  resetPassword: async (newPassword: string, confirmPassword: string): Promise<void> => {
    // Vérifiez si les mots de passe correspondent
    if (newPassword !== confirmPassword) {
      throw new Error('Les mots de passe ne correspondent pas.');
    }
  
    // Vérifiez si le mot de passe respecte les critères
    if (!accountServices.validatePassword(newPassword)) {
      throw new Error('Le nouveau mot de passe ne respecte pas les critères.');
    }
  
    try {
      const response = await fetch('https://api.example.com/user/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password: newPassword }),
      });
  
      if (!response.ok) {
        throw new Error('Échec de la réinitialisation du mot de passe.');
      }
  
      console.log('Mot de passe réinitialisé avec succès.');
    } catch (error) {
      console.error('Erreur lors de la réinitialisation du mot de passe :', error);
      throw error;
    }
  },
  /**
   * Change l'image de profil de l'utilisateur.
   * @param {File | string} profilePicture - Fichier ou URL de l'image.
   */
  changeProfilePicture: async (profilePicture: File | string): Promise<void> => {
    try {
      const formData = new FormData();
      formData.append('profilePicture', profilePicture);

      const response = await fetch('https://api.example.com/profile-picture', {
        method: 'POST',
        headers: {
          Authorization: `Bearer YOUR_TOKEN`, // Ajoutez le token d'authentification si nécessaire
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Échec du changement de la photo de profil.');
      }
    } catch (error) {
      throw new Error( 'Une erreur est survenue.');
    }
  },

  /**
   * Supprime l'image de profil de l'utilisateur.
   */
  deleteProfilePicture: async (): Promise<void> => {
    try {
      const response = await fetch('https://api.example.com/profile-picture', {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer YOUR_TOKEN`, // Ajoutez le token d'authentification si nécessaire
        },
      });

      if (!response.ok) {
        throw new Error('Échec de la suppression de la photo de profil.');
      }
    } catch (error) {
      throw new Error( 'Une erreur est survenue.');
    }
  },
  
};
