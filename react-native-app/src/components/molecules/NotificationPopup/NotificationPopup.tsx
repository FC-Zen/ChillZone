import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './style';
import { Icon } from '@components/atoms';
import { colors } from '@theme';

export type NotificationPopupProps = {
  title: string,
  description: string,
  date: string,
  handlePress : () => void,
}

export const NotificationPopup: React.FC<NotificationPopupProps> = ({
  title,
  description,
  date,
  handlePress
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.date}>{date}</Text>
        <Icon name="Cross" color={colors.resolutionBlue} onPress={handlePress} width={20} height={20}/>
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};
