import React from 'react';
import { View, Text, Modal, TouchableOpacity, Image } from 'react-native';
import { Icon } from '@components/atoms/Icons';
import { colors } from '@theme';
import { styles } from './style';
import { useTranslation } from 'react-i18next';
import { PageHeader } from '@components/molecules';

export type HelpModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const HelpModal = ({ isOpen, onClose }: HelpModalProps) => {
  const { t } = useTranslation();

  return (
    <Modal
      animationType="slide"
      statusBarTranslucent={true}
      transparent={true}
      presentationStyle='overFullScreen'
      visible={isOpen}
      onRequestClose={onClose}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContent}>
          <PageHeader 
            title={t('modals.AdeHelpTitle')}
            variant='back' 
            onBackPress={onClose}
            colorTitle={colors.white}
            icon={{ name: 'BackArrow', color: colors.white, width: 20, height: 20 }}
            noMargin
            style={styles.header}
          />

          {/* Étapes */}
          <Text style={styles.stepText}>{t('modals.Step1')}</Text>
          <Text style={styles.stepText}>{t('modals.Step2')}</Text>
          <Image
            source={require('@assets/Images/options.png')}
            style={styles.image}
          />
          <Text style={styles.stepText}>{t('modals.Step3')}</Text>
          <Image
            source={require('@assets/Images/export.png')}
            style={styles.image}
          />
          <Text style={styles.finalText}>{t('modals.Note')}</Text>
        </View>
      </View>
    </Modal>
  );
};
