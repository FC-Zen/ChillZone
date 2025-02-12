import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './style';
import { Icon } from '@components/atoms';
import { date } from 'zod';

export type NotificationPopupProps = {
  title: string;
  description: string;
  date: string;
  handlePress: () => void;
};

export const NotificationPopup: React.FC<NotificationPopupProps> = ({
  title,
  description,
  date,
  handlePress,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.date}>{date}</Text>
        <TouchableOpacity onPress={handlePress}>
          <Icon name="Cross" color="#000" />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};
