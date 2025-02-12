import React from 'react';
import { View, Text, ViewStyle } from 'react-native';
import { Icon, IconProps } from '@components/atoms';
import { styles } from './style';
import { ROUTE } from '@enums';
import { useNavigation } from '@hooks';

export type PageHeaderProps = {
  title: string;
  variant: 'default' | 'back' | 'cross'; // Ajout de la variante "cross"
  icon?: IconProps; // Icône personnalisée (optionnel)
  onBackPress?: () => void; // Fonction personnalisée pour le clic
  noMargin?: boolean; // Suppression des marges (optionnel)
  colorTitle?: string;
  colorArrow?: string;
  style?: ViewStyle;
};

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  colorTitle,
  variant,
  colorArrow,
  icon = { name: 'BackArrow', color: colorArrow || 'black' }, // Icône par défaut
  onBackPress,
  noMargin,
  style,
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
        style,
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

      <Text
        style={[
          styles.title,
          variant === 'back' && styles.titleWithBack,
          colorTitle ? { color: colorTitle } : {},
        ]}
      >
        {title}
      </Text>

      {variant !== 'default' && <View style={styles.spacer} />}
    </View>
  );
};
