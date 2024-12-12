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

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 86,
    paddingHorizontal: 27,
    paddingVertical: 21,
    borderWidth: 1,
    borderColor: '#BBB',
    backgroundColor: '#FFF',
    gap: 10,
  },
  iconContainer: {
    width: 50,
    height: 50,
    padding: 13,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: '#2E2A85',
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  title: {
    width: 190,
    color: '#2E2A85',
    fontFamily: 'Montserrat',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
  },
  message: {
    width: 272,
    maxHeight: 40,
    color: '#000',
    fontFamily: 'Montserrat',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
  },
  time: {
    color: '#000',
    fontFamily: 'Montserrat',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 18,
  },
});

export default NotificationItem;
