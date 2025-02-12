import React from 'react';
import { View, Text, TouchableOpacity, Linking } from 'react-native';
import { PageHeader } from '@components/molecules/PageHeader';
import socialLinks from 'src/assets/data/social_networks.json';
import { colors } from '@theme';
import { styles } from './style';
import { ROUTE } from '@enums';
import { useNavigation } from '@hooks';
import { Icon } from '@components/atoms/Icons';
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
        return <Icon name="Facebook" width={42} height={42} />;
      case 'X':
        return <Icon name="X" width={42} height={42} />;
      case 'Instagram':
        return <Icon name="Instagram" width={42} height={42} />;
      case 'Youtube':
        return <Icon name="Youtube" width={42} height={42} />;
      case 'LinkedIn':
        return <Icon name="LinkendIn" width={42} height={42} />;
      case 'ENT':
        return <Icon name="Ent" width={42} height={42} />;
      case "Site de l'université":
        return <Icon name="Web" width={42} height={42} />;
      default:
        return <Icon name="Web" width={42} height={42} />;
    }
  };

  return (
    <View style={styles.container}>
      <PageHeader
        title={t('headers.links')}
        variant="back"
        onBackPress={() => navigation.navigate(ROUTE.ACCOUNT)}
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
              <View>{getIconForType(link.type)}</View>
              <Text style={styles.linkText}>{link.type}</Text>
            </View>
            <Icon
              name="ArrowRight"
              width={24}
              height={24}
              color={colors.resolutionBlue}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};
