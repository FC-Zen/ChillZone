import React from 'react';
import { ScrollView } from 'react-native';
import { PageHeader } from '@components/molecules/PageHeader';
import { ProfileHeader } from '@components/molecules/ProfileHeader';
import { AccountOptionsList } from '@components/templates/AccountOptionsList';
import { styles } from './style';

export type AccountTemplateProps = {
  isDarkTheme: boolean;
  onToggleTheme: () => void;
  currentLanguage: string;
  onChangeLanguage: () => void;
  onOpenLinksModal: () => void;
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
  onOpenLinksModal,
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
    <PageHeader title="Mon compte" variant="back" />
    <ProfileHeader name="Kellian BREDEAU" />
    <AccountOptionsList
      isDarkTheme={isDarkTheme}
      onToggleTheme={onToggleTheme}
      currentLanguage={currentLanguage}
      onChangeLanguage={onChangeLanguage}
      onOpenLinksModal={onOpenLinksModal}
      onOpenPasswordModal={onOpenPasswordModal}
      onOpenResetPasswordModal={onOpenResetPasswordModal}
      onOpenEditInfoModal={onOpenEditInfoModal}
      onOpenOrdersModal={onOpenOrdersModal}
      onOpenReservationsModal={onOpenReservationsModal}
    />
  </ScrollView>
);
