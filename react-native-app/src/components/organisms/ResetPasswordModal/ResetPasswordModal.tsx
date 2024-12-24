import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Alert,
} from 'react-native';

export type ResetPasswordModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const ResetPasswordModal = ({
  isOpen,
  onClose,
}: ResetPasswordModalProps) => {
  const [email, setEmail] = useState('');

  const handleResetPassword = () => {
    if (!email) {
      Alert.alert('Erreur', 'Veuillez entrer une adresse e-mail.');
      return;
    }

    Alert.alert(
      'Succès',
      `Un e-mail de réinitialisation a été envoyé à ${email}.`
    );
    onClose(); // Ferme la modale après soumission
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isOpen}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Réinitialiser le mot de passe</Text>

          {/* Champ pour entrer l'email */}
          <TextInput
            style={styles.input}
            placeholder="Adresse e-mail"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />

          {/* Bouton Réinitialiser */}
          <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
            <Text style={styles.buttonText}>Réinitialiser</Text>
          </TouchableOpacity>

          {/* Bouton Fermer */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>✖</Text>
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modal: {
    backgroundColor: '#2E2A85',
    borderRadius: 10,
    padding: 20,
    width: '90%',
    maxWidth: 400,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    width: '100%',
  },
  button: {
    backgroundColor: '#005745',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  closeButtonText: {
    fontSize: 18,
    color: '#FFF',
  },
});
