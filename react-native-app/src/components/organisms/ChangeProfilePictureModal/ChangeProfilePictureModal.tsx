import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';

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

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fond semi-transparent
  },
  modal: {
    backgroundColor: '#2E2A85',
    borderRadius: 15,
    padding: 20,
    width: '90%',
    maxWidth: 400,
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    zIndex: 10,
  },
  closeButtonText: {
    fontSize: 18,
    color: '#FFF',
  },
  avatarContainer: {
    backgroundColor: '#FFF',
    borderRadius: 50,
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarIcon: {
    fontSize: 40,
    color: '#2E2A85',
  },
  primaryButton: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 15,
    width: '100%',
  },
  primaryButtonText: {
    color: '#2E2A85',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  secondaryButton: {
    backgroundColor: '#D9534F',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    width: '100%',
  },
  secondaryButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
