import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Linking,
} from 'react-native';
import ArrowRight from '@components/atoms/Icons/list/ArrowRight'; // Remplace par ton icône de flèche si nécessaire
import socialLinks from 'src/assets/data/social_networks.json'; // Import des données JSON

export type LinksModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const LinksModal: React.FC<LinksModalProps> = ({ isOpen, onClose }) => {
  const handleOpenLink = (url: string) => {
    // Ouvrir le lien dans le navigateur
    Linking.openURL(url).catch((err) =>
      console.error('Failed to open URL:', err)
    );
  };

  const getIconForType = (type: string) => {
    // Retourne une icône basée sur le type du réseau
    switch (type) {
      case 'Facebook':
        return '📘';
      case 'Instagram':
        return '📸';
      case 'Youtube':
        return '📹';
      case 'LinkedIn':
        return '💼';
      case 'ENT':
        return '🗂️';
      case "Site de l'université":
        return '🌐';
      default:
        return '🔗'; // Icône par défaut
    }
  };

  if (!isOpen) return null;

  return (
    <Modal transparent visible={isOpen} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          {/* Bouton de fermeture */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>✖</Text>
          </TouchableOpacity>

          {/* Titre */}
          <Text style={styles.title}>Liens de l'IUT</Text>

          {/* Liste des liens */}
          <View>
            {socialLinks.social_networks.map((link, index) => (
              <TouchableOpacity
                key={index}
                style={styles.linkContainer}
                onPress={() => handleOpenLink(link.link_network)} // Ouvre le lien
              >
                {/* Affichage de l'icône basée sur le type */}
                <Text style={styles.linkIcon}>{getIconForType(link.type)}</Text>
                {/* Affichage du texte */}
                <Text style={styles.linkText}>{link.type}</Text>
                {/* Flèche */}
                <ArrowRight color="#512D6D" />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default LinksModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  closeButtonText: {
    fontSize: 18,
    color: '#512D6D',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  linkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  linkIcon: {
    fontSize: 24,
    marginRight: 10,
  },
  linkText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
});
