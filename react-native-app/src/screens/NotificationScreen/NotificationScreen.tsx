import React, { useEffect, useState } from 'react';
import {
  NotificationTemplate,
  NotificationTemplateProps,
} from '@components/templates/NotificationTemplate/NotificationTemplate';
import notificationsData from '@assets/data/notifications.json';
import { View } from 'react-native';
import { styles } from './style';
import { useNavigation } from '@hooks';
import { ROUTE } from '@enums';
import { NotificationListProps } from '@components/organisms/NotificationList/NotificationList';
import { getNotifications } from '@services/NotificationServices';
import { NotificationProps } from '@components/molecules/Notification';

export const NotificationScreen: React.FC = () => {
  // État pour stocker les données des restaurants
  const [notificationData, setNotificationData] = useState<NotificationProps[]>(
    []
  );

  // Chargement des données des restaurants au démarrage
  useEffect(() => {
    const fetchData = async () => {
      const notifications = await getNotifications();

      setNotificationData(notifications);
    };

    fetchData();
  }, []);

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <NotificationTemplate
        notifications={notifications}
        onBackPress={() => navigation.navigate(ROUTE.HOME)}
      />
    </View>
  );
};
