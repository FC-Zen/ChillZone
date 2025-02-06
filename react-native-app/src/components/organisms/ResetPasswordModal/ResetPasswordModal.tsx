import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Alert,
} from 'react-native';
import { Button, Input } from '@components/molecules';
import { Icon } from '@components/atoms/Icons';
import { colors } from '@theme';
import styles from './style';
import { useTranslation } from 'react-i18next';
import { accountServices } from '@services/AccountServices'; // Import du service

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
          {/* Titre */}
          <Text style={styles.title}>{t('headers.pwdChange')}</Text>

          {/* Sous-titre */}
          <Text style={styles.subtitle}>{t('modals.mail')}</Text>

          {/* Champ pour entrer l'email */}
          <Input
            style={styles.input}
            placeholder={t('fields.common.mail')}
            value={email} // Utiliser la valeur de l'email provenant des props
            onChangeText={setEmail} // Met à jour l'état avec setEmail
          />

          {/* Bouton Réinitialiser */}
          <Button
            title={t('buttons.actions.reset')}
            onPress={handleResetPassword}
            color={colors.aquaDeep}
            style={{ marginVertical: 10 }}
          />

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
        </View>
      </View>
    </Modal>
  );
};
