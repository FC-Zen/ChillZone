import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text } from '@components/atoms';
import { Icon } from '@components/atoms';
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
      <TouchableOpacity>
        <Icon name="Profile" width={80} height={80} onPress={onOpenModal} />
      </TouchableOpacity>
      <Text style={styles.name}>{name}</Text>
    </View>
  );
};
