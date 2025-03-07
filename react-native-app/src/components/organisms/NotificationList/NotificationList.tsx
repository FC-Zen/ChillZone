import React from 'react';
import { ScrollView, View } from 'react-native';
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
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={true}
      persistentScrollbar={true}
    >
      {notifications.map((notification, index) => (
        <View key={index}>
          <NotificationItem
            title={notification.title}
            handleSwitch={notification.handleSwitch}
            icon={notification.icon}
            isEnabled={notification.isEnabled}
          />
        </View>
      ))}
    </ScrollView>
  );
};
