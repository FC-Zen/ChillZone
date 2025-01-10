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

  const navigation = useNavigation();

  // États pour le thème sombre et la langue
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  // Données utilisateur pour la modalité EditInfoModal
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
  });

  // État pour l'email dans ResetPasswordModal
  const [email, setEmail] = useState('');

  // Gestion des champs d'input
  const handleInputChange = (field: keyof typeof userData, value: string) => {
    setUserData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Gestion de la confirmation pour EditInfoModal
  const handleConfirmEditInfo = async () => {
    if (!accountServices.validateUserInfo(userData)) {
      Alert.alert('Erreur', 'Veuillez vérifier les informations saisies.');
      return;
    }

    try {
      await accountServices.updateUserInfo(userData);
      Alert.alert('Succès', 'Vos informations ont été mises à jour.');
      setEditInfoModalOpen(false); // Fermer la modale après succès
    } catch (error) {
      Alert.alert('Erreur', 'Une erreur est survenue lors de la mise à jour.');
    }
  };

  // Gestion de la réinitialisation de mot de passe
  const handleResetPassword = async () => {
    if (!email) {
      Alert.alert('Erreur', 'Veuillez entrer une adresse e-mail.');
      return;
    }

    try {
      await accountServices.resetPassword(email);
      Alert.alert(
        'Succès',
        `Un e-mail de réinitialisation a été envoyé à ${email}.`
      );
      setResetModalOpen(false); // Fermer la modale après succès
    } catch (error: any) {
      Alert.alert('Erreur', error.message || 'Une erreur est survenue.');
    }
  };

  // Gestion du changement de langue
  const [currentLanguage, setCurrentLanguage] = useState(
    translationService.getCurrentLanguage()
  );

  const handleChangeLanguage = () => {
    translationService.toggleLanguage();
  };

  // Gestion du thème sombre
  const toggleTheme = () => setIsDarkTheme((prev) => !prev);

  return (
    <SafeAreaView
      style={[styles.container, isDarkTheme && styles.darkContainer]}
    >
      <AccountTemplate
        isDarkTheme={isDarkTheme}
        onToggleTheme={toggleTheme}
        currentLanguage={currentLanguage}
        onChangeLanguage={handleChangeLanguage}
        onOpenPasswordModal={() => setPasswordModalOpen(true)}
        onOpenResetPasswordModal={() => setResetModalOpen(true)}
        onOpenEditInfoModal={() => setEditInfoModalOpen(true)}
        onNavigateToReservations={() =>
          navigation.navigate(ROUTE.RESERVATION_SUMMARY)
        }
        onNavigateToCommand={() =>
          navigation.navigate(ROUTE.COMMAND_SUMMARY)
        }
      />

      {/* Modales */}
      <PasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setPasswordModalOpen(false)}
      />
      <ResetPasswordModal
        isOpen={isResetModalOpen}
        onClose={() => setResetModalOpen(false)}
        email={email} // Passe l'état email
        setEmail={setEmail} // Passe le setter pour l'email
        handleResetPassword={handleResetPassword} // Passe la fonction de réinitialisation
      />
      <EditInfoModal
        isOpen={isEditInfoModalOpen}
        onClose={() => setEditInfoModalOpen(false)}
        onChange={handleInputChange}
        onConfirm={handleConfirmEditInfo}
        data={userData}
      />
    </SafeAreaView>
  );
};
