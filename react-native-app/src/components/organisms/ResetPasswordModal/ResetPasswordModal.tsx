import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Alert,
} from 'react-native';
import { Input } from '@components/molecules';
import { Icon } from '@components/atoms/Icons';
import { colors } from '@theme';
import styles from './style';
import { useTranslation } from 'react-i18next';
import { accountServices } from '@services/AccountServices'; // Import du service
import { Button } from 'react-native-paper';

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

  // Composant principal qui utilise la modale
  const ResetPassword = () => {
    const [isModalOpen, setModalOpen] = React.useState(false);

    // Méthode pour gérer la réinitialisation
    const handleResetPassword = async () => {
      if (!email) {
        Alert.alert('Erreur', 'Veuillez entrer une adresse e-mail.');
        return;
      }

      try {
        // Appel au service de réinitialisation
        await accountServices.resetPassword(email, ''); // Utilisez un mot de passe vide ou passez l'email uniquement

        Alert.alert(
          'Succès',
          `Un e-mail de réinitialisation a été envoyé à ${email}.`
        );
        setModalOpen(false); // Ferme la modale après succès
      } catch (error: any) {
        Alert.alert('Erreur', error.message || 'Une erreur est survenue.');
      }
    };
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
          {/* Titre */}
          <Text style={styles.title}>{t('headers.pwdChange')}</Text>

          {/* Sous-titre */}
          <Text style={styles.subtitle}>{t('modals.mail')}</Text>

          {/* Champ pour entrer l'email */}
          <Input
            style={styles.input}
            placeholder={t('fields.common.mail')}
            onChangeText={setEmail}
          />

          {/* Bouton Réinitialiser */}
          <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
            <Text style={styles.buttonText}>{t('buttons.actions.reset')}</Text>
          </TouchableOpacity>

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
