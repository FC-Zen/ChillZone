// src/components/molecules/NotificationItem.tsx
import React from 'react';
import { View, Text } from 'react-native';
import { Icon } from '@components/atoms';
import { styles } from './style';

export type NotificationItemProps = {
  title: string;
  description: string;
  time: string;
}

export const NotificationItem: React.FC<NotificationItemProps> = ({
  title,
  description,
  time,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Icon name="Bell" color="#fff" />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.message} numberOfLines={2}>
          {description}
        </Text>
      </View>
      <Text style={styles.time}>{time}</Text>
    </View>
  );
};
