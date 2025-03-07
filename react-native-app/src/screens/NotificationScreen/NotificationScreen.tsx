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

  const [notificationData, setNotificationData] = useState<{
    notifications: NotificationProps[];
  }>({ notifications: [] });

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const data: Notification[] = await getNotifications();
        if (data.length > 0) {
          const notificationsState = data[0];

          const formattedNotifications: NotificationProps[] = [
            {
              title: t('notifications.command'),
              icon: 'Setting',
              handleSwitch: (value) => handleToggle('command', value),
              isEnabled: notificationsState.command,
            },
            {
              title: t('notifications.event'),
              icon: 'Setting',
              handleSwitch: (value) => handleToggle('event', value),
              isEnabled: notificationsState.event,
            },
            {
              title: t('notifications.reservation'),
              icon: 'Setting',
              handleSwitch: (value) => handleToggle('reservation', value),
              isEnabled: notificationsState.reservation,
            },
          ];

          setNotificationData({ notifications: formattedNotifications });
        }
      } catch (error) {
        console.error('Erreur lors du chargement des notifications:', error);
      }
    };

    fetchNotifications();
  }, [t]);

  const handleToggle = async (key: keyof Notification, value: boolean) => {
    try {
      setNotificationData((prevData) => ({
        notifications: prevData.notifications.map((notif) =>
          notif.title === t(`notifications.${key}`)
            ? { ...notif, isEnabled: value }
            : notif
        ),
      }));

      await updateNotification({ is_read: value });

      console.log(`Notification ${key} mise à jour :`, value);
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
      />
    </View>
  );
};
