import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';
import { AccountTemplate } from '@components/templates';
import {
  PasswordModal,
  ResetPasswordModal,
  EditInfoModal,
} from '@components/organisms';
import { styles } from './style';
import { translationService } from '@services';

export const AccountScreen: React.FC = () => {
  // États pour les modales
  const [isPasswordModalOpen, setPasswordModalOpen] = useState(false);
  const [isResetModalOpen, setResetModalOpen] = useState(false);
  const [isEditInfoModalOpen, setEditInfoModalOpen] = useState(false);

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
        onChange={() => {}} // Provide the appropriate onChange function
        onConfirm={() => {}} // Provide the appropriate onConfirm function
        data={{
          firstName: '',
          lastName: '',
          phone: '',
          email: '',
        }}
      />
    </SafeAreaView>
  );
};
