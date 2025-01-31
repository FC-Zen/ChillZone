import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';
import { Input } from '@components/molecules';
import { Icon } from '@components/atoms/Icons';
import { colors } from '@theme';
import { styles } from './style';
import { useTranslation } from 'react-i18next';
import { Button } from '@components/molecules';
import { HelpModal } from '@components/organisms'; // Importez la modale d'aide

export type AdeModalProps = {
  isOpen: boolean;
  onClose: () => void;
  adeLink: string;
  setAdeLink: (link: string) => void;
  onSubmit: () => void;
};

export const AdeModal = ({
  isOpen,
  onClose,
  adeLink,
  setAdeLink,
  onSubmit,
}: AdeModalProps) => {
  const { t } = useTranslation();
  const [isHelpModalOpen, setHelpModalOpen] = useState(false); // État pour ouvrir/fermer la modale d'aide

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
              onPress={() => setHelpModalOpen(true)} // Ouvre la modale d'aide
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

          {/* Modale d'Aide */}
          <HelpModal
            isOpen={isHelpModalOpen}
            onClose={() => setHelpModalOpen(false)} // Ferme la modale d'aide
          />
        </View>
      </View>
    </Modal>
  );
};
