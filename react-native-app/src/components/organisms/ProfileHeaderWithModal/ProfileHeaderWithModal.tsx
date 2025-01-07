import React from 'react';
import { View } from 'react-native';
import { ProfileHeader } from '@components/molecules/ProfileHeader';
import { ChangeProfilePictureModal } from '@components/organisms/ChangeProfilePictureModal';
import { styles } from './style';
import user_data from '@assets/fr.json';

// Hook pour gérer l'état de la modale
const useProfileHeaderModalLogic = () => {
  const [isModalOpen, setModalOpen] = React.useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return {
    isModalOpen,
    openModal,
    closeModal,
  };
};

export const ProfileHeaderWithModal: React.FC = () => {
  const { isModalOpen, openModal, closeModal } = useProfileHeaderModalLogic();

  return (
    <View style={styles.container}>
      {/* Header du profil */}
      <ProfileHeader
        name={
          user_data.fields.common.first_name +
          ' ' +
          user_data.fields.common.last_name
        }
        onOpenModal={openModal}
      />

      {/* Modale */}
      <ChangeProfilePictureModal isOpen={isModalOpen} onClose={closeModal} />
    </View>
  );
};
