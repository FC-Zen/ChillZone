import React from 'react';
import { View, Text, Modal, TouchableOpacity, Image } from 'react-native';
import { Icon } from '@components/atoms/Icons';
import { colors } from '@theme';
import { styles } from './style';
import { useTranslation } from 'react-i18next';

export type HelpModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const HelpModal = ({ isOpen, onClose }: HelpModalProps) => {
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
          <TouchableOpacity style={styles.closeIcon}>
            <Icon
              name="BackArrow"
              width={20}
              height={20}
              color={colors.white}
              onPress={onClose}
            />
          </TouchableOpacity>

          {/* Titre */}
          <Text style={styles.title}>{t('modals.AdeHelpTitle')}</Text>

          {/* Étapes */}
          <Text style={styles.stepText}>{t('modals.Step1')}</Text>
          <Text style={styles.stepText}>{t('modals.Step2')}</Text>
          <Image
            source={require('@assets/Images/options.png')} // Remplacez par le chemin correct de l'image
            style={styles.image}
          />
          <Text style={styles.stepText}>{t('modals.Step3')}</Text>
          <Image
            source={require('@assets/Images/export.png')} // Remplacez par le chemin correct de l'image
            style={styles.image}
          />
          <Text style={styles.finalText}>{t('modals.Note')}</Text>
        </View>
      </View>
    </Modal>
  );
};
