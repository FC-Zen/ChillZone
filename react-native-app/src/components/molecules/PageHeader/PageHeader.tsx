import React from 'react';
import { View, Text } from 'react-native';
import { Icon, IconProps } from '@components/atoms';
import { styles } from './style';
import { useNavigation } from '@hooks'; // Votre custom hook pour la navigation
import { ROUTE } from '@enums';

export type PageHeaderProps = {
  title: string;
  variant: 'default' | 'back' | 'cross'; // Ajout de la variante "cross"
  icon?: IconProps; // Icône personnalisée (optionnel)
  onBackPress?: () => void; // Fonction personnalisée pour le clic
  noMargin?: boolean; // Suppression des marges (optionnel)
};

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  variant,
  icon = { name: 'BackArrow', color: 'black' }, // Icône par défaut
  onBackPress,
  noMargin,
}) => {
  const navigation = useNavigation();
  const headerHeight = 60;

  return (
    <View
      style={[
        styles.container,
        variant === 'back' ? styles.back : styles.default,
        variant === 'back' &&
          !noMargin && { top: headerHeight > 0 ? headerHeight : '5%' },
      ]}
    >
      {/* Icône personnalisée en fonction de la variante */}
      {variant !== 'default' && (
        <Icon
          name={icon.name || (variant === 'back' ? 'BackArrow' : 'Cross')} // Choix de l'icône
          color={icon.color}
          width={24}
          height={24}
          onPress={
            onBackPress
              ? onBackPress
              : () =>
                  navigation.navigate(
                    variant === 'back' ? ROUTE.HOME : ROUTE.ACCOUNT
                  )
          } // Action par défaut ou personnalisée
        />
      )}

      {/* Titre de la page */}
      <Text style={[styles.title, variant === 'back' && styles.titleWithBack]}>
        {title}
      </Text>

      {/* Spacer pour équilibrer l'espace */}
      {variant !== 'default' && <View style={styles.spacer} />}
    </View>
  );
};
