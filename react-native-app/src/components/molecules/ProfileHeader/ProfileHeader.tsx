import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { Text } from '@components/atoms';
import { Icon } from '@components/atoms';
import { styles } from './style';
import { API_URL } from '@env';

export type ProfileHeaderProps = {
  name: string;
  photo_link : string;
  onOpenModal: () => void; // Callback pour ouvrir la modal
};

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  name,
  photo_link,
  onOpenModal,
}) => {
  return (
    <View style={styles.container}>
      {/* Icône cliquable */}
      <TouchableOpacity onPress={onOpenModal}>
        <Image source={{ uri: `${API_URL}${photo_link}` }} width={100} height={100} borderRadius={50} />
      </TouchableOpacity>
      <Text style={styles.name}>{name}</Text>
    </View>
  );
};
