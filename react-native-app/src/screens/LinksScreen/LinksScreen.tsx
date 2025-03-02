import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Linking } from 'react-native';
import { PageHeader } from '@components/molecules/PageHeader';
import { colors } from '@theme';
import { styles } from './style';
import { ROUTE } from '@enums';
import { useNavigation } from '@hooks';
import { Icon } from '@components/atoms/Icons';
import { useTranslation } from 'react-i18next';
import { getLinksNetworks } from '@services/AccountServices';

export type Links = {
  id : number;
  type : string;
  link_network : string;
}

export const LinksScreen: React.FC = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const [socialLinks,setSocialLinks] = useState<Links[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getLinksNetworks();
        if (res) {
          setSocialLinks(res.data);
        }
      } catch (error) {
        console.error('Erreur lors du chargement des données :', error);
      }
    };

    fetchData();
  }, []);

  const handleOpenLink = (url: string) => {
    Linking.openURL(url).catch((err) =>
      console.error('Failed to open URL:', err)
    );
  };

  const getIconForType = (type: string) => {
    switch (type) {
      case 'facebook':
        return <Icon name="Facebook" width={42} height={42} />;
      case 'x':
        return <Icon name="X" width={42} height={42} />;
      case 'instagram':
        return <Icon name="Instagram" width={42} height={42} />;
      case 'youtube':
        return <Icon name="Youtube" width={42} height={42} />;
      case 'linkedin':
        return <Icon name="LinkendIn" width={42} height={42} />;
      case 'workspace':
        return <Icon name="Ent" width={42} height={42} />;
      case "website":
        return <Icon name="Web" width={42} height={42} />;
      case "bluesky":
        return <Icon name="Bluesky" width={42} height={42} />;
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
        {socialLinks.map((link, index) => (
          <TouchableOpacity
            key={index}
            style={styles.linkContainer}
            onPress={() => handleOpenLink(link.link_network)}
          >
            <View style={styles.linkContent}>
              <View>{getIconForType(link.type)}</View>
              <Text style={styles.linkText}>{t(`networks.${link.type}`)}</Text>
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
