// src/components/templates/NotificationTemplate.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import NotificationList from '../../organisms/Notification/NotificationList';

const NotificationTemplate = ({ notifications }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Notifications</Text>
      </View>
      <NotificationList notifications={notifications} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: 'purple',
    padding: 10,
    alignItems: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default NotificationTemplate;
