// src/components/molecules/PageHeader/PageHeader.tsx
import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Icon } from '@components/atoms';
import Text from '../../atoms/Text/Text';
import { styles } from './style';

export type PageHeaderProps = {
  title: string;
  onBackPress?: () => void;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, onBackPress }) => {
  return (
    <View style={styles.container}>
      {onBackPress && (
        <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
          <Icon name="Lock" color="#fff" style={styles.icon} />
        </TouchableOpacity>
      )}
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};
