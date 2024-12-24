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
        notificationsData={notificationData}
        popupProps={{
          name: 'Cross',
          color: '#000',
          width: 20,
          height: 20,
        }}
        pageHeaderProps={{
          title: 'Notifications',
          variant: 'back',
          icon: {
            name: 'Cross',
            color: '#000',
            width: 20,
            height: 20,
          },
          onBackPress: () => navigation.navigate(ROUTE.HOME),
        }}
      />
    </View>
  );
};
