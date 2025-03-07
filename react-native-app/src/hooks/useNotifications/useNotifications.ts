import { useEffect, useState, useRef } from 'react';
import * as Notifications from 'expo-notifications';
import NotificationService from '@services/NotifsPhone';
import { getNotifications } from '@services';
import { Notification as Notif } from '@services';

export function useNotifications() {
  const [expoPushToken, setExpoPushToken] = useState<string | null>(null);
  const [notification, setNotification] =
    useState<Notifications.Notification | null>(null);
  const [notificationSettings, setNotificationSettings] = useState({
    command: true,
    event: true,
    reservation: true,
  });

  const notificationListener = useRef<Notifications.Subscription | null>(null);
  const responseListener = useRef<Notifications.Subscription | null>(null);

  useEffect(() => {
    const registerNotifications = async () => {
      const token =
        await NotificationService.registerForPushNotificationsAsync();
      setExpoPushToken(token);
    };

    const fetchNotificationSettings = async () => {
      try {
        const data = await getNotifications();
        if (data.length > 0) {
          setNotificationSettings(data[0]);
        }
      } catch (error) {
        console.error(
          'Erreur lors de la récupération des paramètres de notification:',
          error
        );
      }
    };

    NotificationService.configureNotificationHandler();
    registerNotifications();
    fetchNotificationSettings();

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notif) => {
        setNotification(notif);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        //console.log('Notification response:', response);
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

  const scheduleNotification = async (
    title: string,
    body: string,
    type: keyof Notif,
    data: object = {}
  ) => {
    if (!notificationSettings[type]) {
      console.log(`🚫 Notification "${type}" désactivée, pas d'envoi.`);
      return;
    }
    await NotificationService.scheduleNotification(title, body, type, data);
  };

  return {
    expoPushToken,
    notification,
    scheduleNotification,
  };
}
