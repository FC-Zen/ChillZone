import { useEffect, useState, useRef } from 'react';
import * as Notifications from 'expo-notifications';
import NotificationService from '@services/NotifsPhone';

export function useNotifications() {
  const [expoPushToken, setExpoPushToken] = useState<string | null>(null);
  const [notification, setNotification] =
    useState<Notifications.Notification | null>(null);
  const notificationListener = useRef<Notifications.Subscription | null>(null);
  const responseListener = useRef<Notifications.Subscription | null>(null);

  useEffect(() => {
    const registerNotifications = async () => {
      const token =
        await NotificationService.registerForPushNotificationsAsync();
      setExpoPushToken(token);
    };

    NotificationService.configureNotificationHandler();
    registerNotifications();

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notif) => {
        setNotification(notif);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log('Notification response:', response);
      });

    return () => {
      notificationListener.current &&
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
      responseListener.current &&
        Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return {
    expoPushToken,
    notification,
    scheduleNotification: NotificationService.scheduleNotification,
  };
}
