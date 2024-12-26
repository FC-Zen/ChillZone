import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from '@components/atoms';
import { ChangeProfilePictureModal } from '@components/organisms/ChangeProfilePictureModal';

export type ProfileHeaderProps = {
  name: string;
};

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ name }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  return (
    <View style={styles.container}>
      {/* Avatar cliquable */}
      <TouchableOpacity onPress={handleOpenModal}>
        <View style={styles.avatar} />
      </TouchableOpacity>
      <Text style={styles.name}>{name}</Text>

      {/* Modale pour changer la photo de profil */}
      <ChangeProfilePictureModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { alignItems: 'center', marginVertical: 20 },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#512D6D',
  },
  name: { fontSize: 18, fontWeight: 'bold', marginTop: 10 },
});
