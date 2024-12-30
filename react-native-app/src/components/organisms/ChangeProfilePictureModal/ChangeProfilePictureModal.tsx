import React from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { styles } from './style';

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
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>✖</Text>
          </TouchableOpacity>

          {/* Avatar ou icône */}
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarIcon}>👤</Text>
          </View>

          {/* Bouton pour changer le mot de passe */}
          <TouchableOpacity style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>
              Changer la photo de profil
            </Text>
          </TouchableOpacity>

          {/* Bouton pour supprimer */}
          <TouchableOpacity style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>
              Supprimer la photo de profil
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
