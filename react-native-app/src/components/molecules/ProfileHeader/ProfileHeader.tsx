import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from '@components/atoms';
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
      {/* Avatar cliquable */}
      <TouchableOpacity onPress={onOpenModal}>
        <View style={styles.avatar} />
      </TouchableOpacity>
      <Text style={styles.name}>{name}</Text>
    </View>
  );
};
