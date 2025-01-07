import React from 'react';
import { View, Text, TouchableOpacity, Linking } from 'react-native';
import { PageHeader } from '@components/molecules/PageHeader';
import socialLinks from 'src/assets/data/social_networks.json';
import { colors } from '@theme';
import { styles } from './style';
import { ROUTE } from '@enums';
import { useNavigation } from '@hooks';

import {
  Facebook,
  Instagram,
  X,
  Youtube,
  LinkendIn,
  Ent,
  Web,
  ArrowRight,
} from '@components/atoms/Icons';
import { useTranslation } from 'react-i18next';

export const LinksScreen: React.FC = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();

  const handleOpenLink = (url: string) => {
    Linking.openURL(url).catch((err) =>
      console.error('Failed to open URL:', err)
    );
  };

  const getIconForType = (type: string) => {
    switch (type) {
      case 'Facebook':
        return <Facebook width={42} height={42} />;
      case 'X':
        return <X width={42} height={42} />;
      case 'Instagram':
        return <Instagram width={42} height={42} />;
      case 'Youtube':
        return <Youtube width={42} height={42} />;
      case 'LinkedIn':
        return <LinkendIn width={42} height={42} />;
      case 'ENT':
        return <Ent width={42} height={42} />;
      case "Site de l'université":
        return <Web width={42} height={42} />;
      default:
        return <Web width={42} height={42} />;
    }
  };

  return (
    <View style={styles.container}>
      {/* En-tête de la page */}
      <PageHeader
        title={t('headers.links')} // Titre traduit
        variant="back"
        icon={{ name: 'BackArrow', color: colors.black }} // Icône de retour
        onBackPress={() => navigation.navigate(ROUTE.ACCOUNT)} // Action de retour
      />

      {/* Liste des liens */}
      <View style={styles.linksContainer}>
        {socialLinks.social_networks.map((link, index) => (
          <TouchableOpacity
            key={index}
            style={styles.linkContainer}
            onPress={() => handleOpenLink(link.link_network)}
          >
            <View style={styles.linkContent}>
              {/* Icône avec fond rond */}
              <View style={styles.iconContainer}>
                {getIconForType(link.type)}
              </View>
              {/* Texte sans traduction pour les types */}
              <Text style={styles.linkText}>{link.type}</Text>
            </View>
            {/* Flèche à droite */}
            <ArrowRight color={colors.resolutionBlue} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};
