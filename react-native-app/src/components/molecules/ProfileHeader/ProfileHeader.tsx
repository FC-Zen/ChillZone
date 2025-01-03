import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text } from '@components/atoms';
import { Profile, User } from '@components/atoms/Icons'; // Remplacez par l'import correct de votre bibliothèque d'icônes
import { styles } from './style';

export type ProfileHeaderProps = {
  name: string;
  onOpenModal: () => void; // Callback pour ouvrir la modal
};

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  name,
  onOpenModal,
}) => {
  return (
    <View style={styles.container}>
      {/* Icône cliquable */}
      <TouchableOpacity onPress={onOpenModal}>
        <Profile />
      </TouchableOpacity>
      <Text style={styles.name}>{name}</Text>
    </View>
  );
};
