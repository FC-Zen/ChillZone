import React from 'react';
import { ScrollView, View } from 'react-native';
import { PageHeader, ProfileHeader } from '@components/molecules';
import { AccountOptionsList } from '@components/organisms';
import {
  ChangeProfilePictureModal,
  PasswordModal,
  ResetPasswordModal,
  EditInfoModal,
} from '@components/organisms';
import { styles } from './style';
import { useTranslation } from 'react-i18next';

export type AccountTemplateProps = {
  isDarkTheme: boolean;
  onToggleTheme: () => void;
  currentLanguage: string;
  onChangeLanguage: () => void;
  onOpenPasswordModal: () => void;
  onOpenResetPasswordModal: () => void;
  onOpenEditInfoModal: () => void;
  onNavigateToReservations: () => void;
  onNavigateToCommand: () => void;
  onChangePicture: () => void;
  onDeletePicture: () => void;
  isModalOpen: boolean;
  onOpenModal: () => void;
  onCloseModal: () => void;
  onBackPress: () => void;
  isPasswordModalOpen: boolean;
  onClosePasswordModal: () => void;
  oldPassword: string;
  setOldPassword: (password: string) => void;
  newPassword: string;
  setNewPassword: (password: string) => void;
  confirmPassword: string;
  setConfirmPassword: (password: string) => void;
  newPasswordValidation: {
    minLength: boolean;
    hasUppercase: boolean;
    hasLowercase: boolean;
    hasNumber: boolean;
    hasSpecialChar: boolean;
  };
  onSubmitPasswordChange: () => void;
  isResetModalOpen: boolean;
  onCloseResetModal: () => void;
  email: string;
  setEmail: (email: string) => void;
  handleResetPassword: () => void;
  isEditInfoModalOpen: boolean;
  onCloseEditInfoModal: () => void;
  userData: any;
  handleInputChange: (field: string, value: string) => void;
  handleConfirmEditInfo: () => void;
  handleLogout: () => void;
};

export const AccountTemplate: React.FC<AccountTemplateProps> = ({
  isDarkTheme,
  onToggleTheme,
  currentLanguage,
  onChangeLanguage,
  onOpenPasswordModal,
  onOpenResetPasswordModal,
  onOpenEditInfoModal,
  onNavigateToReservations,
  onNavigateToCommand,
  onChangePicture,
  onDeletePicture,
  isModalOpen,
  onOpenModal,
  onCloseModal,
  onBackPress,
  isPasswordModalOpen,
  onClosePasswordModal,
  oldPassword,
  setOldPassword,
  newPassword,
  setNewPassword,
  confirmPassword,
  setConfirmPassword,
  newPasswordValidation,
  onSubmitPasswordChange,
  isResetModalOpen,
  onCloseResetModal,
  email,
  setEmail,
  handleResetPassword,
  isEditInfoModalOpen,
  onCloseEditInfoModal,
  userData,
  handleInputChange,
  handleConfirmEditInfo,
  handleLogout
}) => {
  const { t } = useTranslation();

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        isDarkTheme && styles.darkContainer,
      ]}
    >
      {/* Header de la page */}
      <PageHeader
        title={t('headers.account')}
        variant="back"
        onBackPress={onBackPress}
      />

      {/* Section du profil avec modale */}
      <View style={styles.container}>
        <ProfileHeader name={`${userData.first_name || ''} ${userData.last_name || ''}`} onOpenModal={onOpenModal} photo_link={userData.photo_link}/>

        <ChangeProfilePictureModal
          photo_link={userData.photo_link}
          isOpen={isModalOpen}
          onClose={onCloseModal}
          onChangePicture={onChangePicture}
          onDeletePicture={onDeletePicture}
        />
      </View>

      {/* Liste des options */}
      <AccountOptionsList
        isDarkTheme={isDarkTheme}
        onToggleTheme={onToggleTheme}
        currentLanguage={currentLanguage}
        onChangeLanguage={onChangeLanguage}
        onOpenPasswordModal={onOpenPasswordModal}
        onOpenResetPasswordModal={onOpenResetPasswordModal}
        onOpenEditInfoModal={onOpenEditInfoModal}
        onNavigateToReservations={onNavigateToReservations}
        onNavigateToCommand={onNavigateToCommand}
        handleLogout={handleLogout}
      />

      {/* Modales */}
      <PasswordModal
        isOpen={isPasswordModalOpen}
        onClose={onClosePasswordModal}
        oldPassword={oldPassword}
        setOldPassword={setOldPassword}
        newPassword={newPassword}
        setNewPassword={setNewPassword}
        confirmPassword={confirmPassword}
        setConfirmPassword={setConfirmPassword}
        newPasswordValidation={newPasswordValidation}
        onSubmit={onSubmitPasswordChange}
      />
      <ResetPasswordModal
        isOpen={isResetModalOpen}
        onClose={onCloseResetModal}
        email={email}
        setEmail={setEmail}
        handleResetPassword={handleResetPassword}
      />
      <EditInfoModal
        isOpen={isEditInfoModalOpen}
        onClose={onCloseEditInfoModal}
        data={userData}
        onChange={handleInputChange}
        onConfirm={handleConfirmEditInfo}
      />
    </ScrollView>
  );
};
