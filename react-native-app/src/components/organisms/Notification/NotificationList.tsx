// src/components/organisms/NotificationList.tsx
import React from 'react';
import { FlatList } from 'react-native';
import NotificationItem from '../../molecules/Notification/NotificationItem';

interface Notification {
  id: number;
  title: string;
  description: string;
  time: string;
}

interface NotificationListProps {
  notifications: Notification[];
}

const NotificationList: React.FC<NotificationListProps> = ({
  notifications,
}) => {
  return (
    <FlatList
      data={notifications}
      renderItem={({ item }) => (
        <NotificationItem
          title={item.title}
          description={item.description}
          time={item.time}
        />
      )}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};

export default NotificationList;
