import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { ProfileHeader } from '@components/molecules/ProfileHeader';
import { ChangeProfilePictureModal } from '@components/organisms/ChangeProfilePictureModal';
import { styles } from './style';
import user_data from 'src/assets/fr.json';

export const ProfileHeaderWithModal: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <View style={styles.container}>
      {/* Passer la logique via des props */}
      <ProfileHeader
        name={user_data.fields.common.first_name + ' ' + user_data.fields.common.last_name}
        onOpenModal={openModal}
      />

      {/* Modale */}
      <ChangeProfilePictureModal isOpen={isModalOpen} onClose={closeModal} />
    </View>
  );
};

