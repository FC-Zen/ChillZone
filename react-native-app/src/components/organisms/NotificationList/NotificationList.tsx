// src/components/organisms/NotificationList.tsx
import React from 'react';
import { Modal, ScrollView, View, TouchableOpacity } from 'react-native';
import { NotificationItem } from '@components/molecules';
import { styles } from './style';
import { NotificationPopup } from '@components/molecules';
import { useState } from 'react';

export type NotificationProps = {
  id: number;
  title: string;
  description: string;
  time: string;
};

export type NotificationListProps = {
  notifications: NotificationProps[];
};

export const NotificationList: React.FC<NotificationListProps> = ({
  notifications,
  popupIcon,
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
                    date={new Date(notification.time).toLocaleDateString(
                      undefined,
                      {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      }
                    )}
                    handlePress={closeModal}
                  />
                </TouchableOpacity>
              </TouchableOpacity>
            </View>
          </Modal>
          <NotificationItem
            title={notification.title}
            description={notification.description}
            time={notification.time}
            handlePress={() => setSelectedNotificationId(notification.id)}
          />
        </View>
      ))}
    </ScrollView>
  );
};
