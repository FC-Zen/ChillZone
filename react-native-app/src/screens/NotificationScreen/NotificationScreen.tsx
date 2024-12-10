// src/screens/NotificationPage.tsx
import React from 'react';
import NotificationTemplate from '../../components/templates/NotificationTemplate/NotificationTemplate';

const notifications = [
  {
    id: '1',
    title: 'Titre de la notification',
    message: 'Admin message',
    time: '8h',
  },
  {
    id: '2',
    title: 'Titre de la notification',
    message: 'Admin message',
    time: '8h',
  },
  // Ajoutez plus de notifications ici
];

const NotificationPage = () => {
  return <NotificationTemplate notifications={notifications} />;
};

export default NotificationPage;
