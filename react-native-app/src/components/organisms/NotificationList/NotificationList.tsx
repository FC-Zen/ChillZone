// src/components/organisms/NotificationList.tsx
import React from 'react';
import { FlatList, View } from 'react-native';
import { NotificationItem } from '@components/molecules/Notification';
import { styles } from './style';
import { NotificationPopup } from '../NotificationPopup/NotificationPopup';

export type NotificationProps = {
  id: number;
  title: string;
  description: string;
  time: string;
}

export type NotificationListProps = {
  notifications: NotificationProps[];
}

export const NotificationList: React.FC<NotificationListProps> = ({
  notifications,
}) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  return (
    <View style={styles.container}>
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
    </View>
  );
};
