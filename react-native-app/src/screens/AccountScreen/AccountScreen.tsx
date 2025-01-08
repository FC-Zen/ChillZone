import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';
import { AccountTemplate } from '@components/templates/AccountTemplate';
import {
  PasswordModal,
  ResetPasswordModal,
  EditInfoModal,
} from '@components/organisms';
import ordersData from 'src/assets/data/commands.json';
import { styles } from './style';
import { translationService } from '@services';
import { useNavigation } from '@react-navigation/native'; // Import pour la navigation
import { ROUTE } from '@enums'; // Enum pour gérer les routes

export const AccountScreen: React.FC = () => {
  const navigation = useNavigation(); // Hook pour naviguer entre les écrans

  // États pour les modales
  const [isPasswordModalOpen, setPasswordModalOpen] = useState(false);
  const [isResetModalOpen, setResetModalOpen] = useState(false);
  const [isEditInfoModalOpen, setEditInfoModalOpen] = useState(false);
  const [isOrderModalOpen, setOrderModalOpen] = useState(false);
  const [isReservationsModalOpen, setReservationsModalOpen] = useState(false);

  // États pour le thème sombre et la langue
  const [isDarkTheme, setIsDarkTheme] = useState(false);

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
      />

      {/* Modales */}
      <PasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setPasswordModalOpen(false)}
      />
      <ResetPasswordModal
        isOpen={isResetModalOpen}
        onClose={() => setResetModalOpen(false)}
        email={''} // Provide the appropriate email state
        setEmail={() => {}} // Provide the appropriate setEmail function
        handleResetPassword={() => {}} // Provide the appropriate handleResetPassword function
      />
      <EditInfoModal
        isOpen={isEditInfoModalOpen}
        onClose={() => setEditInfoModalOpen(false)}
        data={{}} // Provide the appropriate data object
        onChange={() => {}} // Provide the appropriate onChange function
        onConfirm={() => {}} // Provide the appropriate onConfirm function
      />
    </SafeAreaView>
  );
};
