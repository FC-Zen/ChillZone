import React from 'react';
import { View, Text, TouchableOpacity, Modal, Alert } from 'react-native';
import { styles } from './style';
import user_profile_data from '@assets/fr.json';
import { Icon, IconProps } from '@components/atoms/Icons';
import { colors } from '@theme';
import { useTranslation } from 'react-i18next';
import { accountServices } from '@services/AccountServices'; // Import des services

export type ChangeProfilePictureModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const ChangeProfilePictureModal = ({
  isOpen,
  onClose,
}: ChangeProfilePictureModalProps) => {
  const { t } = useTranslation();

  // Gestion du changement de la photo de profil
  const handleChangePicture = async () => {
    try {
      // Vous pouvez ici ouvrir un sélecteur de fichiers ou de photos
      const mockFile = 'file://example-path/profile-picture.png'; // Remplacez par un vrai fichier ou chemin
      await accountServices.changeProfilePicture(mockFile);

      Alert.alert('Succès', 'Votre photo de profil a été mise à jour.');
      onClose();
    } catch (error: any) {
      Alert.alert('Erreur', error.message || 'Une erreur est survenue.');
    }
  };

  // Gestion de la suppression de la photo de profil
  const handleDeletePicture = async () => {
    try {
      await accountServices.deleteProfilePicture();

      Alert.alert('Succès', 'Votre photo de profil a été supprimée.');
      onClose();
    } catch (error: any) {
      Alert.alert('Erreur', error.message || 'Une erreur est survenue.');
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isOpen}
      onRequestClose={onClose} // Gère la fermeture sur Android
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
            onPress={handleChangePicture} // Appel de la méthode
          >
            <Text style={styles.primaryButtonText}>
              {t('buttons.profile.changePp')}
            </Text>
          </TouchableOpacity>

          {/* Bouton pour supprimer */}
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={handleDeletePicture} // Appel de la méthode
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
