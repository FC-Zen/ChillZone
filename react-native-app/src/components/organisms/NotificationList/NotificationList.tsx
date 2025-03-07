import React from 'react';
import { View } from 'react-native';
import { NotificationItem } from '@components/molecules';
import { styles } from './style';
import { NotificationProps } from '@components/molecules/Notification';

export type NotificationListProps = {
  notifications: NotificationProps[];
};

export const NotificationList: React.FC<NotificationListProps> = ({
  notifications,
}) => {
  return (
    <View style={styles.container}>
      {notifications.map((notification, index) => (
        <View key={index} style={styles.contentContainer}>
          <NotificationItem
            title={notification.title}
            handleSwitch={notification.handleSwitch}
            icon={notification.icon}
            isEnabled={notification.isEnabled}
          />
        </View>
      ))}
    </View>
  );
};
