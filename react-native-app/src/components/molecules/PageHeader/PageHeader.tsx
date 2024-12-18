// src/components/molecules/PageHeader/PageHeader.tsx
import React from 'react';
import { View, Text } from 'react-native';
import { Icon } from '@components/atoms';
import { styles } from './style';
import { useHeaderHeight } from '@react-navigation/elements';

export type PageHeaderProps = {
  title: string;
  variant: 'default' | 'back';
  onBackPress?: () => void;
};

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  variant,
  onBackPress,
}) => {
  const headerHeight = useHeaderHeight();
  return (
    <View style={[styles.container, { top: headerHeight }]}>
      {variant == 'back' && (
        <Icon
          name="Cross"
          color="#000"
          style={styles.icon}
          onPress={onBackPress}
          width={16}
          height={16}
        />
      )}
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};
