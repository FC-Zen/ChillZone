import React from 'react';
import { NotificationTemplate } from '../../components/templates/NotificationTemplate/NotificationTemplate';
import notificationsData from '../../assets/data/notifications.json';
import { View } from 'react-native';
import { styles } from './style';

export const NotificationScreen: React.FC = () => {
  // Mapper les données JSON aux propriétés attendues par NotificationTemplate
  const notifications = notificationsData.notification.map(
    (notification, index) => ({
      id: index,
      title: notification.title,
      description: notification.description,
      time: notification.date,
    })
  );

  return (
    <View style={styles.container}>
      <NotificationTemplate notifications={notifications} />
    </View>
  );
};
