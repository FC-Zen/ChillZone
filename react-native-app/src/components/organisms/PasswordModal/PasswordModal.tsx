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

export type PasswordModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const PasswordModal = ({ isOpen, onClose }: PasswordModalProps) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = () => {
    if (newPassword !== confirmPassword) {
      Alert.alert('Erreur', 'Les mots de passe ne correspondent pas.');
      return;
    }

    Alert.alert('Succès', 'Mot de passe modifié avec succès.');
    onClose(); // Fermer la modale après soumission
  };

  return (
    <Modal
      animationType="slide" // Animation pour l'apparition de la modale
      transparent={true} // Fond transparent pour créer un overlay
      visible={isOpen} // Contrôle de l'affichage de la modale
      onRequestClose={onClose} // Ferme la modale en cas de retour (Android)
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Modifier mon mot de passe</Text>

          {/* Champ pour l'ancien mot de passe */}
          <TextInput
            style={styles.input}
            placeholder="Entrez votre ancien mot de passe"
            secureTextEntry
            value={oldPassword}
            onChangeText={setOldPassword}
          />

          {/* Champ pour le nouveau mot de passe */}
          <TextInput
            style={styles.input}
            placeholder="Nouveau mot de passe"
            secureTextEntry
            value={newPassword}
            onChangeText={setNewPassword}
          />

          {/* Messages de validation */}
          <View style={styles.validationContainer}>
            <Text
              style={[
                styles.validation,
                newPassword.length >= 12 ? styles.valid : styles.invalid,
              ]}
            >
              12+ caractères
            </Text>
            <Text
              style={[
                styles.validation,
                /[A-Z]/.test(newPassword) ? styles.valid : styles.invalid,
              ]}
            >
              1+ majuscule
            </Text>
            <Text
              style={[
                styles.validation,
                /[a-z]/.test(newPassword) ? styles.valid : styles.invalid,
              ]}
            >
              1+ minuscule
            </Text>
            <Text
              style={[
                styles.validation,
                /\d/.test(newPassword) ? styles.valid : styles.invalid,
              ]}
            >
              1+ chiffre
            </Text>
            <Text
              style={[
                styles.validation,
                /[@$!%*?&]/.test(newPassword) ? styles.valid : styles.invalid,
              ]}
            >
              1+ caractère spécial
            </Text>
          </View>

          {/* Champ pour confirmer le mot de passe */}
          <TextInput
            style={styles.input}
            placeholder="Confirmer le mot de passe"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />

          {/* Bouton Confirmer */}
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Confirmer</Text>
          </TouchableOpacity>

          {/* Bouton Fermer */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Fermer</Text>
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
    borderRadius: 10,
    padding: 20,
    width: '90%',
    maxWidth: 400,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  validationContainer: {
    marginBottom: 15,
  },
  validation: {
    fontSize: 12,
    marginBottom: 5,
  },
  valid: {
    color: 'green',
  },
  invalid: {
    color: 'red',
  },
  button: {
    backgroundColor: '#005745',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  closeButton: {
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#D9534F',
    borderRadius: 8,
  },
  closeButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default PasswordModal;
