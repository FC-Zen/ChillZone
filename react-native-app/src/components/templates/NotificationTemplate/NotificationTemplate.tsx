// src/components/templates/NotificationTemplate.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import NotificationList from '../../organisms/Notification/NotificationList';
import PageHeader from '../../molecules/PageHeader/PageHeader';

const NotificationTemplate = ({ notifications }) => {
  return (
    <View style={styles.container}>
      <PageHeader title="Notifications" />
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
