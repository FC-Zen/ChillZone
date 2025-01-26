import React from 'react';
import { View, Text } from 'react-native';
import { Icon, IconProps } from '@components/atoms';
import { styles } from './style';
import { useNavigation } from '@hooks';

export type PageHeaderProps = {
  title: string;
  variant: 'default' | 'back' | 'cross'; // Ajout de la variante "cross"
  icon?: IconProps; // Icône personnalisée (optionnel)
  onBackPress?: () => void; // Fonction personnalisée pour le clic
  noMargin?: boolean; // Suppression des marges (optionnel)
  colorTitle?: string;
  colorArrow?: string;
};

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  colorTitle,
  variant,
  colorArrow,
  icon = { name: 'BackArrow', color: colorArrow || 'black' }, // Icône par défaut
  onBackPress,
  noMargin,
}) => {
  const headerHeight = 60;
  const navigation = useNavigation();

  return (
    <View
      style={[
        styles.container,
        variant === 'back' ? styles.back : styles.default,
        variant === 'back' &&
          !noMargin && { top: headerHeight > 0 ? headerHeight : '5%' },
      ]}
    >
      {variant === 'back' && icon && (
        <Icon
          name={icon.name}
          color={icon.color}
          onPress={onBackPress || navigation.goBack}
          width={16}
          height={16}
        />
      )}

      {/* Titre de la page */}
      <Text
        style={[
          styles.title,
          variant === 'back' && styles.titleWithBack,
          colorTitle ? { color: colorTitle } : {},
        ]}
      >
        {title}
      </Text>

      {/* Spacer pour équilibrer l'espace */}
      {variant !== 'default' && <View style={styles.spacer} />}
    </View>
  );
};
