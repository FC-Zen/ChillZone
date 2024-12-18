import React from 'react';
import { NotificationTemplate } from '@components/templates/NotificationTemplate/NotificationTemplate';
import notificationsData from '@assets/data/notifications.json';
import { View } from 'react-native';
import { styles } from './style';
import { useTranslation } from 'react-i18next';

function diff_time(date1: Date, date2: Date) {
  const { t } = useTranslation();

  // Calculer la différence de temps entre les deux dates
  let timeDiff = date2.getTime() - date1.getTime();

  // Retourner la différence de temps en fonction de l'unité de temps
  // 1000 = 1 seconde
  if (timeDiff < 1000) {
    return t('timeUnit.now');
  }
  
  else if (timeDiff < 1000 * 60) {
    // Si la différence de temps est inférieure à 2 minutes, retourner "1 minute" au lieu de "1 minutes"
    if (timeDiff < 1000 * 2) {
      return Math.floor(timeDiff / 1000) + ' ' + t('timeUnit.second');
    }
    return Math.floor(timeDiff / 1000) + ' ' + t('timeUnit.second') + 's';
  } 
  
  else if (timeDiff < 1000 * 60 * 60) {
    // La même logique s'applique pour les minutes
    if (timeDiff < 1000 * 60 * 2) {
      return Math.floor(timeDiff / 60000) + ' ' + t('timeUnit.minute');
    }
    return Math.floor(timeDiff / 60000) + ' ' + t('timeUnit.minute') + 's';
  } 
  
  else if (timeDiff < 86400000) {
    // Pour les heures
    if (timeDiff < 7200000) {
      return Math.floor(timeDiff / 3600000) + ' ' + t('timeUnit.hour');
    }
    return Math.floor(timeDiff / 3600000) + ' ' + t('timeUnit.hour') + 's';
  } 
  
  else {
    // Et pour les jours
    if (timeDiff < 172800000) {
      return Math.floor(timeDiff / 86400000) + ' ' + t('timeUnit.day');
    }
    return Math.floor(timeDiff / 86400000) + ' ' + t('timeUnit.day') + 's';
  }
}

export const NotificationScreen: React.FC = () => {
  // Mapper les données JSON aux propriétés attendues par NotificationTemplate
  const notifications = notificationsData.notification.map(
    (notification, index) => ({
      id: index,
      title: notification.title,
      description: notification.description,
      time: notification.date,
    })
  );

  return (
    <View style={styles.container}>
      <NotificationTemplate notifications={notifications} />
    </View>
  );
};
