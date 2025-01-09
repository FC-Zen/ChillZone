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
import { colors } from '@theme';
import { Input } from '@components/molecules';
import { Icon, IconProps } from '@components/atoms/Icons';
import { useTranslation } from 'react-i18next';
import { accountServices } from '@services/AccountServices'; // Import du service

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

  const handleSubmit = async (onClose: () => void) => {
    if (newPassword !== confirmPassword) {
      Alert.alert('Erreur', 'Les mots de passe ne correspondent pas.');
      return;
    }

    if (!accountServices.validatePassword(newPassword)) {
      Alert.alert(
        'Erreur',
        'Le nouveau mot de passe ne respecte pas les critères requis.'
      );
      return;
    }

    try {
      // Appel au service pour mettre à jour le mot de passe
      await accountServices.updatePassword(oldPassword, newPassword);
      Alert.alert('Succès', 'Mot de passe modifié avec succès.');
      onClose(); // Fermer la modale après soumission
    } catch (error) {
      Alert.alert('Erreur', 'La mise à jour du mot de passe a échoué.');
    }
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
      <Icon
        name={isValid ? 'Clock' : 'CrossCircle'} // Utilisation d'une icône conditionnelle
        color={isValid ? colors.darkCyan : colors.white}
        width={12}
        height={12}
      />
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

  const { t } = useTranslation();
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
          <TouchableOpacity style={styles.closeIcon}>
            <Icon
              name="Cross"
              color={colors.white}
              width={15}
              height={15}
              onPress={onClose}
            />
          </TouchableOpacity>

          <Text style={styles.title}>{t('modals.pwdChange')}</Text>

          {/* Champ pour l'ancien mot de passe */}
          <Input
            style={styles.input}
            placeholder={t('fields.auth.lastPassword')}
            value={oldPassword}
            onChangeText={setOldPassword}
          />

          {/* Champ pour le nouveau mot de passe */}
          <Input
            style={styles.input}
            placeholder={t('fields.auth.newPassword')}
            value={newPassword}
            onChangeText={setNewPassword}
          />

          {/* Tags de validation */}
          <View style={styles.validationTagsContainer}>
            {renderValidationTag(
              t('checks.characters'),
              newPasswordValidation.minLength
            )}
            {renderValidationTag(
              t('checks.maj'),
              newPasswordValidation.hasUppercase
            )}
            {renderValidationTag(
              t('checks.minus'),
              newPasswordValidation.hasLowercase
            )}
            {renderValidationTag(
              t('checks.number'),
              newPasswordValidation.hasNumber
            )}
            {renderValidationTag(
              t('checks.special'),
              newPasswordValidation.hasSpecialChar
            )}
          </View>

          {/* Champ pour confirmer le mot de passe */}
          <Input
            style={styles.input}
            placeholder={t('fields.auth.verifyNewPassword')}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />

          {/* Bouton Confirmer */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleSubmit(onClose)}
          >
            <Text style={styles.buttonText}>
              {t('buttons.actions.confirm')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default PasswordModal;
