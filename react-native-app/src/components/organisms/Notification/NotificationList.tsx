import React from 'react';
import { FlatList } from 'react-native';
import { NotificationItem } from '@components/molecules';

type Notification = {
  id: number;
  title: string;
  message: string;
  time: string;
};

type NotificationListProps = {
  notifications: Notification[];
};

const NotificationList: React.FC<NotificationListProps> = ({
  notifications,
}) => {
  return (
    <FlatList
      data={notifications}
      renderItem={({ item }) => (
        <NotificationItem
          title={item.title}
          message={item.message}
          time={item.time}
        />
      )}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};

export default NotificationList;
