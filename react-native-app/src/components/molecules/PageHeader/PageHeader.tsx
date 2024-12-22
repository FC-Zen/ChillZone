// src/components/molecules/PageHeader/PageHeader.tsx
import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Icon } from '@components/atoms';
import { styles } from './style';
import { useHeaderHeight } from '@react-navigation/elements';

export type PageHeaderProps = {
  title: string;
  onBackPress?: () => void;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, onBackPress }) => {
  const headerHeight = useHeaderHeight();
  return (
    <View style={[styles.container, { top: headerHeight }]}>
      {onBackPress && (
        <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
          <Icon name="Lock" color="#fff" style={styles.icon} />
        </TouchableOpacity>
      )}
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};
