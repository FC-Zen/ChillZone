import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './style';
import { Icon, IconProps } from '@components/atoms';
import { colors } from '@theme';

export type PopupProps = {
  name: IconProps['name'];
  color: string;
  width: number;
  height: number;
}

export type NotificationPopupProps = {
  title: string,
  description: string,
  date: string,
  icon: {
    name: IconProps['name'],
    color: string,
    width?: number,
    height?: number,
  }
  handlePress : () => void,
}

export const NotificationPopup: React.FC<NotificationPopupProps> = ({
  title,
  description,
  date,
  icon,
  handlePress
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.date}>{date}</Text>
        <Icon name={icon.name} color={icon.color} onPress={handlePress} width={icon.width} height={icon.height}/>
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};
