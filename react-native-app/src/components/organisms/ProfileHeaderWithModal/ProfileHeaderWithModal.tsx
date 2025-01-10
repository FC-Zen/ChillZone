import React from 'react';
import { View } from 'react-native';
import { ProfileHeader } from '@components/molecules/ProfileHeader';
import { ChangeProfilePictureModal } from '@components/organisms/ChangeProfilePictureModal';
import { styles } from './style';
import { useTranslation } from 'react-i18next';
import { useUser } from '@contexts/AppContrext';

export const ProfileHeaderWithModal: React.FC<{
  onChangePicture: () => Promise<void>; // Gestion du changement de photo
  onDeletePicture: () => Promise<void>; // Gestion de la suppression de photo
}> = ({ onChangePicture, onDeletePicture }) => {
  const [isModalOpen, setModalOpen] = React.useState(false);
  const { t } = useTranslation();
  const { userName } = useUser(); // Récupération du nom d'utilisateur depuis le contexte

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <View style={styles.container}>
      {/* Header du profil */}
      <ProfileHeader
        name={userName || t('fields.common.default_username')}
        onOpenModal={openModal}
      />

      {/* Modale */}
      <ChangeProfilePictureModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onChangePicture={onChangePicture} // Passer la logique via les props
        onDeletePicture={onDeletePicture} // Passer la logique via les props
      />
    </View>
  );
};
