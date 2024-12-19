// src/components/molecules/NotificationItem.tsx
import React, { useEffect } from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';
import { Icon } from '@components/atoms';
import { styles } from './style';
import { NotificationPopup } from '@components/organisms/NotificationPopup/NotificationPopup';
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

export type NotificationItemProps = {
  title: string;
  description: string;
  time: string;
}

export const NotificationItem: React.FC<NotificationItemProps> = ({
  title,
  description,
  time,
}) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  return (
    <View>
      <Modal
          animationType='slide'
          transparent={true}
          presentationStyle='overFullScreen'
          visible={modalVisible}
          onDismiss={() => {
            setModalVisible(false);
          }}
          onRequestClose={() => {
            setModalVisible(false);
          }}
          statusBarTranslucent={true}
        >
          <View style={styles.modalContainer} >
          <TouchableOpacity style={styles.outsideArea} onPress={() => {setModalVisible(false);}} activeOpacity={1}>  
            <TouchableOpacity style={styles.modalContent} activeOpacity={1}>  
              <NotificationPopup title={title} description={description} date={new Date(time).toDateString()} handlePress={() => setModalVisible(false)}></NotificationPopup>
            </TouchableOpacity>
          </TouchableOpacity>
          </View>
        </Modal>

      <TouchableOpacity  style={styles.container} onPress={ () => setModalVisible(true)} >
        <View style={styles.iconContainer}>
          <Icon name="Bell" color="#fff" />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message} numberOfLines={2}>
            {description}
          </Text>
        </View>
        <Text style={styles.time}>{diff_time(new Date(time), new Date())}</Text>
      </TouchableOpacity >
      
    </View>
  );
};
