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

export const AdeModal = ({
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
      transparent={true}
      visible={isOpen}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          {/* Bouton d'Aide */}
          <View style={styles.helpButtonContainer}>
            <Button
              title={t('modals.AdeHelpButton')}
              variant="icon"
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
            variant="icon"
            style={styles.validateButton}
            textColor={colors.white}
            onPress={onSubmit}
          />

          {/* Bouton Fermer */}
          <TouchableOpacity style={styles.closeIcon}>
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
