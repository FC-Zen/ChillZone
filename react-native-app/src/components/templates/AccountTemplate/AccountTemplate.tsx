import React from 'react';
import { ScrollView } from 'react-native';
import { PageHeader } from '@components/molecules/PageHeader';
import { ProfileHeader } from '@components/molecules/ProfileHeader';
import { AccountOptionsList } from '@components/templates/AccountOptionsList';
import { styles } from './style';
import { ProfileHeaderWithModal } from '@components/organisms';
import user_data from 'src/assets/fr.json';
export type AccountTemplateProps = {
  isDarkTheme: boolean;
  onToggleTheme: () => void;
  currentLanguage: string;
  onChangeLanguage: () => void;
  onOpenPasswordModal: () => void;
  onOpenResetPasswordModal: () => void;
  onOpenEditInfoModal: () => void;
  onOpenOrdersModal: () => void;
  onOpenReservationsModal: () => void;
};

export const AccountTemplate: React.FC<AccountTemplateProps> = ({
  isDarkTheme,
  onToggleTheme,
  currentLanguage,
  onChangeLanguage,
  onOpenPasswordModal,
  onOpenResetPasswordModal,
  onOpenEditInfoModal,
  onOpenOrdersModal,
  onOpenReservationsModal,
}) => (
  <ScrollView
    contentContainerStyle={[
      styles.container,
      isDarkTheme && styles.darkContainer,
    ]}
  >
    <PageHeader title={user_data.headers.account} variant="back" />
    <ProfileHeaderWithModal />
    <AccountOptionsList
      isDarkTheme={isDarkTheme}
      onToggleTheme={onToggleTheme}
      currentLanguage={currentLanguage}
      onChangeLanguage={onChangeLanguage}
      onOpenPasswordModal={onOpenPasswordModal}
      onOpenResetPasswordModal={onOpenResetPasswordModal}
      onOpenEditInfoModal={onOpenEditInfoModal}
      onOpenOrdersModal={onOpenOrdersModal}
      onOpenReservationsModal={onOpenReservationsModal}
    />
  </ScrollView>
);
