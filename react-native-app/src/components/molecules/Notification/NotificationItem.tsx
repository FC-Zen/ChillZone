// src/components/molecules/NotificationItem.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon } from '../../atoms/Icons/Icon';

interface NotificationItemProps {
  title: string;
  description: string;
  time: string;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
  title,
  description,
  time,
}) => {
  return (
    <View style={styles.container}>
      <Icon name="Lock" />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.message}>{description}</Text>
      </View>
      <Text style={styles.time}>{time}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  title: {
    fontWeight: 'bold',
  },
  message: {
    color: 'gray',
  },
  time: {
    color: 'gray',
  },
});

export default NotificationItem;
