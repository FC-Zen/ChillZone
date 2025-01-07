import React from 'react';
import { View, Text, Alert } from 'react-native';
import { IconProps } from '@components/atoms';
import { BackArrow } from '@components/atoms/Icons/'; // Import du composant BackArrow
import { styles } from './style';
import { useNavigation } from '@hooks'; // Votre custom hook pour la navigation
import { ROUTE } from '@enums';

export type PageHeaderProps = {
  title: string;
  variant: 'default' | 'back' | 'cross';
  icon?: IconProps; // Rendre icon optionnel
  onBackPress?: () => void;
  noMargin?: boolean;
};

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  variant,
  icon = { name: 'Cross', color: 'black' },
  onBackPress,
  noMargin,
}) => {
  const navigation = useNavigation(); // Utilisation de votre hook personnalisé pour la navigation

  return (
    <View
      style={[
        styles.container,
        variant === 'back' ? styles.back : styles.default,
        variant === 'back' && !noMargin && { top: headerHeight > 0 ? headerHeight : '5%' },
      ]}
    >
      {/* Bouton de retour si "variant" est "back" */}
      {variant === 'back' && (
        <BackArrow
          color={icon.color}
          width={24}
          height={24}
          onPress={onBackPress ? onBackPress : () => navigation.goBack()} // Action par défaut ou personnalisée
        />
      )}

      {/* Titre de la page */}
      <Text style={[styles.title, variant === 'back' && styles.titleWithBack]}>
        {title}
      </Text>

      {/* Spacer pour équilibrer l'espace */}
      {variant === 'back' && <View style={styles.spacer} />}
    </View>
  );
};
