import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { styles } from './style';
import { useNavigation } from '@hooks';
import { NotificationProps } from '@components/molecules';
import { NotificationTemplate } from '@components/templates';
import { useTranslation } from 'react-i18next';
import { getNotifications, updateNotification, Notification } from '@services';

export const NotificationScreen: React.FC = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const [notificationsState, setNotificationsState] = useState<Notification>({
    command: true,
    event: true,
    reservation: true,
  });

  const [notificationData, setNotificationData] = useState<{
    notifications: NotificationProps[];
  }>({ notifications: [] });

  useEffect(() => {
    fetchNotifications();
  }, [t]);

  const fetchNotifications = async () => {
    try {
      const data: Notification[] = await getNotifications();
      if (data.length > 0) {
        const notifications = data[0];
        setNotificationsState(notifications);

        const formattedNotifications: NotificationProps[] = [
          {
            title: t('notifications.command'),
            icon: 'Bag',
            handleSwitch: (value) => handleToggle('command', value),
            isEnabled: notifications.command,
          },
          {
            title: t('notifications.event'),
            icon: 'Calendar',
            handleSwitch: (value) => handleToggle('event', value),
            isEnabled: notifications.event,
          },
          {
            title: t('notifications.reservation'),
            icon: 'Cube',
            handleSwitch: (value) => handleToggle('reservation', value),
            isEnabled: notifications.reservation,
          },
        ];

        setNotificationData({ notifications: formattedNotifications });
      }
    } catch (error) {
      console.error('Erreur lors du chargement des notifications:', error);
    }
  };

  const handleToggle = async (key: keyof Notification, value: boolean) => {
    try {
      const updatedNotifications = { ...notificationsState, [key]: value };
      setNotificationsState(updatedNotifications);

      setNotificationData((prevData) => ({
        notifications: prevData.notifications.map((notif) =>
          notif.title === t(`notifications.${key}`)
            ? { ...notif, isEnabled: value }
            : notif
        ),
      }));

      await updateNotification(updatedNotifications);

      console.log(`Notification ${key} mise à jour :`, updatedNotifications);

      fetchNotifications();
    } catch (error) {
      console.error(`Erreur lors de la mise à jour de ${key}:`, error);
    }
  };

  return (
    <View style={styles.container}>
      <NotificationTemplate
        notificationsData={notificationData}
        pageHeaderProps={{
          title: t('headers.alerts'),
          variant: 'back',
          onBackPress: () => navigation.goBack(),
        }}
        text={t('notifications.explanation')}
      />
    </View>
  );
};
