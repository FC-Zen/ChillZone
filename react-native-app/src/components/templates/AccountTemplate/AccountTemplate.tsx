import React from 'react';
import { ScrollView, Alert } from 'react-native';
import { PageHeader } from '@components/molecules/PageHeader';
import { ProfileHeader } from '@components/molecules/ProfileHeader';
import { AccountOptionsList } from '@components/templates/AccountOptionsList';
import { styles } from './style';
import { ProfileHeaderWithModal } from '@components/organisms';
import { useTranslation } from 'react-i18next';
import { ROUTE } from '@enums';
import { useNavigation } from '@hooks';
import { accountServices } from '@services/AccountServices';

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
}) => {
  const { t } = useTranslation();
  const navigation = useNavigation();

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
    <ScrollView
      contentContainerStyle={[
        styles.container,
        isDarkTheme && styles.darkContainer,
      ]}
    >
      <PageHeader
        title={t('headers.account')}
        variant="back"
        onBackPress={() => navigation.navigate(ROUTE.HOME)}
      />
      <ProfileHeaderWithModal
        onChangePicture={handleChangePicture}
        onDeletePicture={handleDeletePicture}
      />{' '}
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
      />
    </ScrollView>
  );
};
