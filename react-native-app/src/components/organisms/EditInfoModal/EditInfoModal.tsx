import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Modal,
} from 'react-native';

export type EditInfoModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
  }) => void;
};

export const EditInfoModal: React.FC<EditInfoModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const handleConfirm = () => {
    onConfirm({ firstName, lastName, phone, email });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Modal transparent visible={isOpen} animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          {/* Bouton de fermeture */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>✖</Text>
          </TouchableOpacity>

          {/* Titre */}
          <Text style={styles.title}>Modifier mes informations</Text>

          {/* Inputs */}
          <TextInput
            style={styles.input}
            placeholder="Prénom"
            placeholderTextColor="#ccc"
            value={firstName}
            onChangeText={setFirstName}
          />
          <TextInput
            style={styles.input}
            placeholder="Nom"
            placeholderTextColor="#ccc"
            value={lastName}
            onChangeText={setLastName}
          />
          <TextInput
            style={styles.input}
            placeholder="Téléphone"
            placeholderTextColor="#ccc"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />
          <TextInput
            style={styles.input}
            placeholder="Adresse mail"
            placeholderTextColor="#ccc"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />

          {/* Bouton Confirmer */}
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={handleConfirm}
          >
            <Text style={styles.confirmButtonText}>Confirmer</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: '90%',
    backgroundColor: '#2E2A85',
    borderRadius: 10,
    padding: 20,
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  closeButtonText: {
    fontSize: 18,
    color: '#fff',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  confirmButton: {
    backgroundColor: '#005745',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  confirmButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
