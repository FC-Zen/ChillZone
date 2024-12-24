// src/components/molecules/PageHeader/PageHeader.tsx
import React from 'react';
import { View, Text } from 'react-native';
import { Icon, IconProps } from '@components/atoms';
import { styles } from './style';
import { useHeaderHeight } from '@react-navigation/elements';

export type PageHeaderProps = {
  title: string;
  variant: 'default' | 'back';
  icon: {
    name: IconProps['name'];
    color: string;
    width: number;
    height: number;
  }
  onBackPress?: () => void;
};

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  variant,
  icon,
  onBackPress,
}) => {
  const headerHeight = useHeaderHeight();
  return (
    <View style={[styles.container, variant == "back" ? styles.back: styles.default, { top: headerHeight }]}>
      {variant == 'back' && (
        <Icon
          name={icon.name}
          color={icon.color}
          style={styles.icon}
          onPress={onBackPress}
          width={icon.width}
          height={icon.height}
        />
      )}
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};
