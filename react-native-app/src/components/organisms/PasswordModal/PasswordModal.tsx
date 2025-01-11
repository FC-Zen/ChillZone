import React from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { styles } from './style'; // Import des styles
import { colors } from '@theme';
import { Input } from '@components/molecules';
import { Icon } from '@components/atoms/Icons';
import { useTranslation } from 'react-i18next';

export type PasswordModalProps = {
  isOpen: boolean;
  onClose: () => void;
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
  setOldPassword: (value: string) => void;
  setNewPassword: (value: string) => void;
  setConfirmPassword: (value: string) => void;
  newPasswordValidation: {
    minLength: boolean;
    hasUppercase: boolean;
    hasLowercase: boolean;
    hasNumber: boolean;
    hasSpecialChar: boolean;
  };
  onSubmit: () => void;
};

export const PasswordModal: React.FC<PasswordModalProps> = ({
  isOpen,
  onClose,
  oldPassword,
  newPassword,
  confirmPassword,
  setOldPassword,
  setNewPassword,
  setConfirmPassword,
  newPasswordValidation,
  onSubmit,
}) => {
  const { t } = useTranslation();

  const renderValidationTag = (text: string, isValid: boolean) => (
    <View
      style={[
        styles.validationTag,
        isValid ? styles.validTag : styles.invalidTag,
      ]}
    >
      <Icon
        name={isValid ? 'Clock' : 'CrossCircle'}
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

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isOpen}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
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

          {/* Input pour l'ancien mot de passe */}
          <Input
            style={styles.input}
            placeholder={t('fields.auth.lastPassword')}
            value={oldPassword}
            onChangeText={setOldPassword}
          />

          {/* Input pour le nouveau mot de passe */}
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

          {/* Input pour confirmer le mot de passe */}
          <Input
            style={styles.input}
            placeholder={t('fields.auth.verifyNewPassword')}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />

          {/* Bouton Confirmer */}
          <TouchableOpacity style={styles.button} onPress={onSubmit}>
            <Text style={styles.buttonText}>
              {t('buttons.actions.confirm')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
