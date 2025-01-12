import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { PageHeader } from '@components/molecules/PageHeader';
import { ProfileHeader } from '@components/molecules/ProfileHeader';
import { AccountOptionsList } from '@components/templates/AccountOptionsList';
import { ChangeProfilePictureModal } from '@components/organisms';
import { styles } from './style';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@hooks';
import { useUser } from '@contexts/AppContrext';
import { ROUTE } from '@enums';

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
  const { userName } = useUser(); // Récupération du nom d'utilisateur depuis le contexte

  // États pour la modale de changement de photo
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

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
        onBackPress={() => navigation.navigate(ROUTE.HOME)}
      />

      {/* Section du profil avec modale */}
      <View style={styles.container}>
        <ProfileHeader name={userName ?? ''} onOpenModal={openModal} />

        <ChangeProfilePictureModal
          isOpen={isModalOpen}
          onClose={closeModal}
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
      />
    </ScrollView>
  );
};
