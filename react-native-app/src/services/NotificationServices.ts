import notifications_data from '@assets/data/notifications.json';
import { NotificationProps } from '@components/molecules/Notification';
// import axios from 'axios';
import { NotificationListProps } from '@components/organisms/NotificationList/NotificationList';

export const getNotifications = (): NotificationProps[] => {
  // Récupérer les données des notifications
  /*
    const response = await axios.get('https://api.notifications.com');
    const notifications_data = response.data;
    */

  // Retourner les données des notifications
  /*
    return {
        notifications: notifications_data.map((value, index) => {
            const { title, description, time } = value;
            const id = index;
            return {
                id,
                title,
                description,
                time,
            };
        }),
    };
    */

  // Retourner les données des notifications à partir des données statiques
  return notifications_data['notification'].map((value, index) => {
    const { title, description } = value;
    const time = value.date;
    const id = index + 1;
    return {
      id,
      title,
      description,
      time,
      icon: {
        name: 'Bell',
        color: 'white',
      }
    };
  });
};
