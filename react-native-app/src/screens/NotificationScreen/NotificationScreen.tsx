// src/screens/NotificationPage.tsx
import React from 'react';
import NotificationTemplate from '../../components/templates/NotificationTemplate/NotificationTemplate';
import notificationsData from '../../assets/data/notifications.json';

// Mapper les données JSON aux propriétés attendues par NotificationTemplate
const notifications = notificationsData.notification.map(
  (notification, index) => ({
    id: index.toString(),
    title: notification.title,
    description: notification.description,
    time: new Date(notification.date).toLocaleTimeString(),
  })
);

const NotificationPage = () => {
  return <NotificationTemplate notifications={notifications} />;
};

export default NotificationPage;
