import React from 'react';
import { View, Text } from 'react-native';
import { Icon, IconProps } from '@components/atoms';
import { styles } from './style';
import { useHeaderHeight } from '@react-navigation/elements';

export type PageHeaderProps = {
  title: string;
  variant: 'default' | 'back';
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
  const headerHeight = useHeaderHeight();

  return (
    <View
      style={[
        styles.container,
        variant === 'back' ? styles.back : styles.default,
        variant === 'back' && !noMargin && { top: headerHeight > 0 ? headerHeight : '5%' },
      ]}
    >
      {variant === 'back' && icon && (
        <Icon
          name={icon.name}
          color={icon.color}
          onPress={onBackPress}
          width={16}
          height={16}
        />
      )}
      <Text style={[styles.title, variant === 'back' && styles.titleWithBack]}>
        {title}
      </Text>
      {variant === 'back' && <View style={styles.spacer} />}{' '}
    </View>
  );
};
