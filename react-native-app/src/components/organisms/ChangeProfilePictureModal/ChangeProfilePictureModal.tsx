import React from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { styles } from './style';
import user_profile_data from '@assets/fr.json';
import { Icon, IconProps } from '@components/atoms/Icons';
import { colors } from '@theme';
export type ChangeProfilePictureModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const ChangeProfilePictureModal = ({
  isOpen,
  onClose,
}: ChangeProfilePictureModalProps) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isOpen}
      onRequestClose={onClose} // Gère la fermeture sur Android
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          {/* Bouton Fermer */}
          <TouchableOpacity style={styles.closeButton}>
            <Icon
              name="Cross"
              width={15}
              height={15}
              color={colors.white}
              onPress={onClose}
            />
          </TouchableOpacity>

          {/* Avatar ou icône */}
          <View style={styles.avatarContainer}>
            <Icon
              name="User"
              width={60}
              height={60}
              color={colors.resolutionBlue}
            />
          </View>

          {/* Bouton pour changer la photo */}
          <TouchableOpacity style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>
              {user_profile_data.buttons.profile.changePp}
            </Text>
          </TouchableOpacity>

          {/* Bouton pour supprimer */}
          <TouchableOpacity style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>
              {user_profile_data.buttons.profile.deletePp}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
