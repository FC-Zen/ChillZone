import React from 'react';
import { View, Text, TouchableOpacity, Modal, Linking } from 'react-native';
import ArrowRight from '@components/atoms/Icons/list/ArrowRight';
import socialLinks from 'src/assets/data/social_networks.json';
import data_from_fr_json from 'src/assets/fr.json';
import { colors } from '@theme';

// 1. On importe les styles depuis notre fichier externe
import { styles } from './style';
import {
  Cross,
  Facebook,
  Instagram,
  X,
  Youtube,
  LinkendIn,
  Ent,
  Web,
} from '@components/atoms/Icons/';

export type LinksModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const LinksModal: React.FC<LinksModalProps> = ({ isOpen, onClose }) => {
  const handleOpenLink = (url: string) => {
    Linking.openURL(url).catch((err) =>
      console.error('Failed to open URL:', err)
    );
  };

  const getIconForType = (type: string) => {
    switch (type) {
      case 'Facebook':
        return <Facebook width={24} height={24} color={colors.white} />;
      case 'X':
        return <X width={24} height={24} />;
      case 'Instagram':
        return <Instagram width={24} height={24} />;
      case 'Youtube':
        return <Youtube width={24} height={24} />;
      case 'LinkedIn':
        return <LinkendIn width={24} height={24} />;
      case 'ENT':
        return <Ent width={24} height={24} />;
      case "Site de l'université":
        return <Web width={24} height={24} />;
      default:
        return '🔗';
    }
  };

  if (!isOpen) return null;

  return (
    <Modal transparent visible={isOpen} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          {/* Bouton de fermeture */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Cross width={15} height={15} color={colors.black} />
          </TouchableOpacity>

          {/* Titre */}
          <Text style={styles.title}>{data_from_fr_json.headers.links}</Text>

          {/* Liste des liens */}
          <View>
            {socialLinks.social_networks.map((link, index) => (
              <TouchableOpacity
                key={index}
                style={styles.linkContainer}
                onPress={() => handleOpenLink(link.link_network)}
              >
                <Text style={styles.linkIcon}>{getIconForType(link.type)}</Text>
                <Text style={styles.linkText}>{link.type}</Text>
                <ArrowRight color={colors.resolutionBlue} />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default LinksModal;
