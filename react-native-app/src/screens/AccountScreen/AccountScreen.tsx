import React, { useState } from 'react';
import { SafeAreaView, Alert } from 'react-native';
import { AccountTemplate } from '@components/templates';
import {
  PasswordModal,
  ResetPasswordModal,
  EditInfoModal,
} from '@components/organisms';
import { styles } from './style';
import { translationService } from '@services';
import { useNavigation } from '@hooks';
import { ROUTE } from '@enums';
import { accountServices } from '@services/AccountServices';

export const AccountScreen: React.FC = () => {
  // États pour les modales
  const [isPasswordModalOpen, setPasswordModalOpen] = useState(false);
  const [isResetModalOpen, setResetModalOpen] = useState(false);
  const [isEditInfoModalOpen, setEditInfoModalOpen] = useState(false);

  // Navigation
  const navigation = useNavigation();

  // États pour le thème sombre et la langue
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  // Données utilisateur
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
  });

  // État pour le mot de passe et email
  const [email, setEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Validation du mot de passe
  const newPasswordValidation = {
    minLength: newPassword.length >= 12,
    hasUppercase: /[A-Z]/.test(newPassword),
    hasLowercase: /[a-z]/.test(newPassword),
    hasNumber: /\d/.test(newPassword),
    hasSpecialChar: /[@$!%*?&]/.test(newPassword),
  };

  // Gestion des champs d'input
  const handleInputChange = (field: keyof typeof userData, value: string) => {
    setUserData((prev) => ({ ...prev, [field]: value }));
  };

  // Actions pour les modales
  const handleConfirmEditInfo = async () => {
    try {
      if (!accountServices.validateUserInfo(userData)) {
        Alert.alert('Erreur', 'Veuillez vérifier les informations saisies.');
        return;
      }
      await accountServices.updateUserInfo(userData);
      Alert.alert('Succès', 'Vos informations ont été mises à jour.');
      setEditInfoModalOpen(false);
    } catch {
      Alert.alert('Erreur', 'Une erreur est survenue lors de la mise à jour.');
    }
  };

  const handleResetPassword = async () => {
    try {
      if (!email) {
        Alert.alert('Erreur', 'Veuillez entrer une adresse e-mail.');
        return;
      }
      await accountServices.resetPassword(email);
      Alert.alert(
        'Succès',
        `Un e-mail de réinitialisation a été envoyé à ${email}.`
      );
      setResetModalOpen(false);
    } catch {
      Alert.alert('Erreur', 'Une erreur est survenue.');
    }
  };

  const handleSubmitPasswordChange = async () => {
    try {
      if (newPassword !== confirmPassword) {
        Alert.alert('Erreur', 'Les mots de passe ne correspondent pas.');
        return;
      }
      if (!accountServices.validatePassword(newPassword)) {
        Alert.alert(
          'Erreur',
          'Le nouveau mot de passe ne respecte pas les critères requis.'
        );
        return;
      }
      await accountServices.updatePassword(oldPassword, newPassword);
      Alert.alert('Succès', 'Mot de passe modifié avec succès.');
      setPasswordModalOpen(false);
    } catch {
      Alert.alert('Erreur', 'La mise à jour du mot de passe a échoué.');
    }
  };

  const handleChangePicture = async () => {
    try {
      const mockFile = 'file://example-path/profile-picture.png';
      await accountServices.changeProfilePicture(mockFile);
      Alert.alert('Succès', 'Votre photo de profil a été mise à jour.');
    } catch (error) {
      Alert.alert(
        'Erreur',
        (error as any).message || 'Une erreur est survenue.'
      );
    }
  };

  const handleDeletePicture = async () => {
    try {
      await accountServices.deleteProfilePicture();
      Alert.alert('Succès', 'Votre photo de profil a été supprimée.');
    } catch (error) {
      Alert.alert(
        'Erreur',
        (error as any).message || 'Une erreur est survenue.'
      );
    }
  };

  return (
    <SafeAreaView
      style={[styles.container, isDarkTheme && styles.darkContainer]}
    >
      <AccountTemplate
        isDarkTheme={isDarkTheme}
        onToggleTheme={() => setIsDarkTheme(!isDarkTheme)}
        currentLanguage={translationService.getCurrentLanguage()}
        onChangeLanguage={() => translationService.toggleLanguage()}
        onOpenPasswordModal={() => setPasswordModalOpen(true)}
        onOpenResetPasswordModal={() => setResetModalOpen(true)}
        onOpenEditInfoModal={() => setEditInfoModalOpen(true)}
        onNavigateToReservations={() =>
          navigation.navigate(ROUTE.RESERVATION_SUMMARY)
        }
        onNavigateToCommand={() => navigation.navigate(ROUTE.COMMAND_SUMMARY)}
        onChangePicture={handleChangePicture} // Ajouté ici
        onDeletePicture={handleDeletePicture} // Ajouté ici
      />

      {/* Modales */}
      <PasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setPasswordModalOpen(false)}
        oldPassword={oldPassword}
        setOldPassword={setOldPassword}
        newPassword={newPassword}
        setNewPassword={setNewPassword}
        confirmPassword={confirmPassword}
        setConfirmPassword={setConfirmPassword}
        newPasswordValidation={newPasswordValidation}
        onSubmit={handleSubmitPasswordChange}
      />
      <ResetPasswordModal
        isOpen={isResetModalOpen}
        onClose={() => setResetModalOpen(false)}
        email={email}
        setEmail={setEmail}
        handleResetPassword={handleResetPassword}
      />
      <EditInfoModal
        isOpen={isEditInfoModalOpen}
        onClose={() => setEditInfoModalOpen(false)}
        data={userData}
        onChange={handleInputChange}
        onConfirm={handleConfirmEditInfo}
      />
    </SafeAreaView>
  );
};
