import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  Alert,
} from 'react-native';
import { styles } from './style'; // Import des styles
import { Cross } from '@components/atoms/Icons';
import { colors } from '@theme';
import data_from_fr_json from '@assets/fr.json';

export type PasswordModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

// Hook pour gérer la logique du PasswordModal
const usePasswordModalLogic = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const newPasswordValidation = {
    minLength: newPassword.length >= 12,
    hasUppercase: /[A-Z]/.test(newPassword),
    hasLowercase: /[a-z]/.test(newPassword),
    hasNumber: /\d/.test(newPassword),
    hasSpecialChar: /[@$!%*?&]/.test(newPassword),
  };

  const handleSubmit = (onClose: () => void) => {
    if (newPassword !== confirmPassword) {
      Alert.alert('Erreur', 'Les mots de passe ne correspondent pas.');
      return;
    }

    if (
      !newPasswordValidation.minLength ||
      !newPasswordValidation.hasUppercase ||
      !newPasswordValidation.hasLowercase ||
      !newPasswordValidation.hasNumber ||
      !newPasswordValidation.hasSpecialChar
    ) {
      Alert.alert(
        'Erreur',
        'Le nouveau mot de passe ne respecte pas les critères requis.'
      );
      return;
    }

    Alert.alert('Succès', 'Mot de passe modifié avec succès.');
    onClose(); // Fermer la modale après soumission
  };

  return {
    oldPassword,
    setOldPassword,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    newPasswordValidation,
    handleSubmit,
  };
};

export const PasswordModal = ({ isOpen, onClose }: PasswordModalProps) => {
  const {
    oldPassword,
    setOldPassword,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    newPasswordValidation,
    handleSubmit,
  } = usePasswordModalLogic();

  const renderValidationTag = (text: string, isValid: boolean) => (
    <View
      style={[
        styles.validationTag,
        isValid ? styles.validTag : styles.invalidTag,
      ]}
    >
      <Text
        style={[
          styles.validationTagText,
          isValid ? styles.validText : styles.invalidText,
        ]}
      >
        {text}
      </Text>
    </View>
  );

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isOpen}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          {/* Croix pour fermer la modale */}
          <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
            <Cross width={15} height={15} color={colors.white} />
          </TouchableOpacity>

          <Text style={styles.title}>{data_from_fr_json.modals.pwdChange}</Text>

          {/* Champ pour l'ancien mot de passe */}
          <TextInput
            style={styles.input}
            placeholder={data_from_fr_json.fields.auth.lastPassword}
            secureTextEntry
            value={oldPassword}
            onChangeText={setOldPassword}
          />

          {/* Champ pour le nouveau mot de passe */}
          <TextInput
            style={styles.input}
            placeholder={data_from_fr_json.fields.auth.newPassword}
            secureTextEntry
            value={newPassword}
            onChangeText={setNewPassword}
          />

          {/* Tags de validation */}
          <View style={styles.validationTagsContainer}>
            {renderValidationTag(
              '12+ caractères',
              newPasswordValidation.minLength
            )}
            {renderValidationTag(
              '1+ majuscule',
              newPasswordValidation.hasUppercase
            )}
            {renderValidationTag(
              '1+ minuscule',
              newPasswordValidation.hasLowercase
            )}
            {renderValidationTag('1+ chiffre', newPasswordValidation.hasNumber)}
            {renderValidationTag(
              '1+ caractère spécial',
              newPasswordValidation.hasSpecialChar
            )}
          </View>

          {/* Champ pour confirmer le mot de passe */}
          <TextInput
            style={styles.input}
            placeholder={data_from_fr_json.fields.auth.verifyNewPassword}
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />

          {/* Bouton Confirmer */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleSubmit(onClose)}
          >
            <Text style={styles.buttonText}>
              {data_from_fr_json.buttons.actions.confirm}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default PasswordModal;
