import React from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';
import { Input } from '@components/molecules';
import { Icon } from '@components/atoms/Icons';
import { colors } from '@theme';
import { styles } from './style';
import { useTranslation } from 'react-i18next';
import { Button } from '@components/molecules';

export type AdeModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onOpenHelp: () => void; // Géré par le parent
  adeLink: string;
  setAdeLink: (link: string) => void;
  onSubmit: () => void;
};

export const AdeModal: React.FC<AdeModalProps> = ({
  isOpen,
  onClose,
  onOpenHelp,
  adeLink,
  setAdeLink,
  onSubmit,
}: AdeModalProps) => {
  const { t } = useTranslation();

  return (
    <Modal
      animationType="slide"
      visible={isOpen}
      onRequestClose={onClose}
      statusBarTranslucent={true}
      transparent={true}
      presentationStyle='overFullScreen'
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>

          <TouchableOpacity onPress={onClose} style={styles.closeIcon}>
            <Icon
              name="Cross"
              width={15}
              height={15}
              color={colors.white}
            />
          </TouchableOpacity>

          {/* Bouton d'Aide */}
          <View style={styles.helpButtonContainer}>
            <Button
              title={t('modals.AdeHelpButton')}
              style={styles.helpButton}
              textColor={colors.aquaDeep}
              onPress={onOpenHelp} // Passé par le parent
            />
          </View>

          {/* Titre */}
          <Text style={styles.title}>{t('modals.AdeRecover')}</Text>

          {/* Sous-titre */}
          <Text style={styles.subtitle}>{t('modals.AdeLink')}</Text>

          {/* Champ de saisie */}
          <Input
            style={styles.input}
            placeholder={t('modals.AdeLinkPlaceholder')}
            value={adeLink}
            onChangeText={setAdeLink}
          />

          {/* Bouton Valider */}
          <Button
            title={t('modals.AdeValidateButton')}
            textColor={colors.white}
            onPress={onSubmit}
            color={colors.aquaDeep}
          />
        </View>
      </View>
    </Modal>
  );
};
