import React from 'react';
import { View, Text, TouchableOpacity, Modal, Alert } from 'react-native';
import { styles } from './style';
import { Icon } from '@components/atoms/Icons';
import { colors } from '@theme';
import { Input } from '@components/molecules';
import { useTranslation } from 'react-i18next';
import { accountServices } from '@services/AccountServices'; // Import du service

// Déclaration des props juste au-dessus du composant
export type EditInfoModalProps = {
  isOpen: boolean;
  onClose: () => void;
  data: {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
  };
  onChange: (field: keyof EditInfoModalProps['data'], value: string) => void;
  onConfirm: () => void;
};

export const EditInfoModal: React.FC<EditInfoModalProps> = ({
  isOpen,
  onClose,
  data = { firstName: '', lastName: '', phone: '', email: '' }, // Valeur par défaut
  onChange,
  onConfirm,
}) => {
  const { t, i18n } = useTranslation();

  if (!isOpen) return null;

  const handleConfirm = async () => {
    // Valider les informations utilisateur
    if (!accountServices.validateUserInfo(data)) {
      Alert.alert(t('errors.validation'), t('errors.invalidInput'));
      return;
    }

    try {
      // Mettre à jour les informations utilisateur
      await accountServices.updateUserInfo(data);
      Alert.alert(t('success.title'), t('success.infoUpdated'));
      onConfirm(); // Action à effectuer après la mise à jour
    } catch (error) {
      Alert.alert(t('errors.title'), t('errors.updateFailed'));
    }
  };

  return (
    <Modal transparent visible={isOpen} animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          {/* Bouton de fermeture */}
          <TouchableOpacity style={styles.closeButton}>
            <Icon
              name="Cross"
              width={15}
              height={15}
              color={colors.white}
              onPress={onClose}
            />
          </TouchableOpacity>

          {/* Titre */}
          <Text style={styles.title}>{t('modals.infoChange')}</Text>

          {/* Inputs */}
          <Input
            style={styles.input}
            placeholder={t('fields.common.first_name')}
            icon="User"
            value={data.firstName}
            onChangeText={(text) => onChange('firstName', text)}
          />
          <Input
            style={styles.input}
            placeholder={t('fields.common.last_name')}
            icon="User"
            value={data.lastName}
            onChangeText={(text) => onChange('lastName', text)}
          />
          {/* en fait je ne comprends pas quand j'utilise les ciones phone et mail l'ecran crash */}
          <Input
            style={styles.input}
            placeholder={t('fields.common.phone')}
            icon="Phone"
            value={data.phone}
            onChangeText={(text) => onChange('phone', text)}
          />
          <Input
            style={styles.input}
            placeholder={t('fields.common.mail')}
            icon="Mail"
            value={data.email}
            onChangeText={(text) => onChange('email', text)}
          />

          {/* Bouton Confirmer */}
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={handleConfirm}
          >
            <Text style={styles.confirmButtonText}>
              {t('buttons.actions.confirm')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
