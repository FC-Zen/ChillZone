import React from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { styles } from './style';
import { Icon } from '@components/atoms/Icons';
import { colors } from '@theme';
import { useTranslation } from 'react-i18next';

export type ChangeProfilePictureModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onChangePicture: () => void; // Passé par le parent
  onDeletePicture: () => void; // Passé par le parent
};

export const ChangeProfilePictureModal: React.FC<
  ChangeProfilePictureModalProps
> = ({ isOpen, onClose, onChangePicture, onDeletePicture }) => {
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

          {/* Avatar ou icône */}
          <View style={styles.avatarContainer}>
            <Icon
              name="User"
              width={60}
              height={60}
              color={colors.resolutionBlue}
            />
          </View>

          {/* Bouton pour changer la photo */}
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={onChangePicture} // Appel de la fonction parent
          >
            <Text style={styles.primaryButtonText}>
              {t('buttons.profile.changePp')}
            </Text>
          </TouchableOpacity>

          {/* Bouton pour supprimer */}
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={onDeletePicture} // Appel de la fonction parent
          >
            <Text style={styles.secondaryButtonText}>
              {t('buttons.profile.deletePp')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
