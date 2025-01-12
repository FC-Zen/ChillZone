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
  onChangePicture: () => void;
  onDeletePicture: () => void;
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
}) => {
  const { t } = useTranslation();
  const navigation = useNavigation();

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
        onChangePicture={onChangePicture}
        onDeletePicture={onDeletePicture}
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
