import React from 'react';
import { View } from 'react-native';
import { ProfileHeader } from '@components/molecules/ProfileHeader';
import { ChangeProfilePictureModal } from '@components/organisms/ChangeProfilePictureModal';
import { styles } from './style';
import { useTranslation } from 'react-i18next';
import { useUser } from '@contexts/AppContrext';

export const ProfileHeaderWithModal: React.FC<{
  onChangePicture: () => void; // Gestion du changement de photo
  onDeletePicture: () => void; // Gestion de la suppression de photo
}> = ({ onChangePicture, onDeletePicture }) => {
  const [isModalOpen, setModalOpen] = React.useState(false);
  const { t } = useTranslation();
  let { userName } = useUser(); // Récupération du nom d'utilisateur depuis le contexte
  userName = userName ?? ''; // Provide a default value if userName is null

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <View style={styles.container}>
      {/* Header du profil */}
      <ProfileHeader name={userName} onOpenModal={openModal} />

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
