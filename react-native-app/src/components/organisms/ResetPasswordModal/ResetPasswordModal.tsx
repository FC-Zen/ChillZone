import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from 'react-native';

import data_from_fr_json from 'src/assets/fr.json';
import { Cross } from '@components/atoms/Icons';
import { colors } from '@theme';
import styles from './style';

export type ResetPasswordModalProps = {
  isOpen: boolean;
  onClose: () => void;
  email: string;
  setEmail: (email: string) => void;
  handleResetPassword: () => void;
};

export const ResetPasswordModal = ({
  isOpen,
  onClose,
  email,
  setEmail,
  handleResetPassword,
}: ResetPasswordModalProps) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isOpen}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>
            {data_from_fr_json.headers.pwdChange}
          </Text>

          {/* Champ pour entrer l'email */}
          <TextInput
            style={styles.input}
            placeholder={data_from_fr_json.fields.common.mail}
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />

          {/* Bouton Réinitialiser */}
          <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
            <Text style={styles.buttonText}>
              {data_from_fr_json.buttons.actions.reset}
            </Text>
          </TouchableOpacity>

          {/* Bouton Fermer */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Cross width={15} height={15} color={colors.white} />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

// Composant principal qui utilise la modale
const ResetPassword = () => {
  const [isModalOpen, setModalOpen] = React.useState(false);
  const [email, setEmail] = React.useState('');

  const handleResetPassword = () => {
    if (!email) {
      alert('Erreur: Veuillez entrer une adresse e-mail.');
      return;
    }
    alert(`Succès: Un e-mail de réinitialisation a été envoyé à ${email}.`);
    setModalOpen(false);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity
        onPress={() => setModalOpen(true)}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Ouvrir la modale</Text>
      </TouchableOpacity>

      <ResetPasswordModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        email={email}
        setEmail={setEmail}
        handleResetPassword={handleResetPassword}
      />
    </View>
  );
};

export default ResetPassword;
