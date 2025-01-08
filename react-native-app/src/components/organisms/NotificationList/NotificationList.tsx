// src/components/organisms/NotificationList.tsx
import React from 'react';
import { Modal, ScrollView, View, TouchableOpacity } from 'react-native';
import { NotificationItem } from '@components/molecules';
import { styles } from './style';
import { NotificationPopup } from '@components/molecules';
import { useState } from 'react';
import {
  NotificationPopupProps,
  PopupProps,
} from '@components/molecules/NotificationPopup';
import { NotificationProps } from '@components/molecules/Notification';

export type NotificationListProps = {
  notifications: NotificationProps[];
  popupProps: PopupProps;
};

export const NotificationList: React.FC<NotificationListProps> = ({
  notifications,
  popupProps,
}) => {
  const [selectedNotificationId, setSelectedNotificationId] = useState<
    number | null
  >(null);
  const closeModal = () => setSelectedNotificationId(null);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {notifications.map((notification) => (
        <View key={notification.id}>
          <Modal
            animationType="slide"
            transparent={true}
            presentationStyle="overFullScreen"
            visible={selectedNotificationId === notification.id}
            onRequestClose={closeModal}
            statusBarTranslucent={true}
          >
            <View style={styles.modalContainer}>
              <TouchableOpacity
                style={styles.outsideArea}
                onPress={closeModal}
                activeOpacity={1}
              >
                <TouchableOpacity style={styles.modalContent} activeOpacity={1}>
                  <NotificationPopup
                    title={notification.title}
                    description={notification.description}
                    date={notification.time}
                    icon={popupProps}
                    handlePress={closeModal}
                  />
                </TouchableOpacity>
              </TouchableOpacity>
            </View>
          </Modal>
          <NotificationItem
            id={notification.id}
            title={notification.title}
            description={notification.description}
            time={notification.time}
            icon={{
              name: notification.icon?.name || 'Bell',
              color: notification.icon?.color || '#fff',
            }}
            handlePress={() => setSelectedNotificationId(notification.id)}
          />
        </View>
      ))}
    </ScrollView>
  );
};
