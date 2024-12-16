// src/components/molecules/NotificationItem.tsx
import { useState } from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';
import { Icon } from '@components/atoms';
import { styles } from './style';
import { NotificationPopup } from '@components/organisms/NotificationPopup/NotificationPopup';

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
  const [modalVisible, setModalVisible] = useState(false);
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
