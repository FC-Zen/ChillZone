import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import { styles } from './style';
import { Icon } from '@components/atoms/Icons';
import { colors } from '@theme';

export type CourseDetailsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  courseDetails: {
    title: string;
    date: string;
    time: string;
    room: string;
    instructor: string;
  };
};

export const CourseDetailsModal: React.FC<CourseDetailsModalProps> = ({
  isOpen,
  onClose,
  courseDetails,
}) => {
  const { title, date, time, room, instructor } = courseDetails;

  return (
    <Modal 
      visible={isOpen} 
      animationType="slide"
      statusBarTranslucent={true}
      transparent={true}
      presentationStyle='overFullScreen'
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <TouchableOpacity style={styles.closeIcon}>
            <Icon
              name="Cross"
              color={colors.white}
              width={15}
              height={15}
              onPress={onClose}
            />
          </TouchableOpacity>
          <View style={styles.infoRow}>
            <Icon name="Book" color={colors.white} width={24} height={24} />
            <Text style={styles.text}>{title}</Text>
          </View>
          <View style={styles.infoRow}>
            <Icon name="Calendar" color={colors.white} width={24} height={24} />
            <Text style={styles.text}>{date}</Text>
          </View>
          <View style={styles.infoRow}>
            <Icon name="Clock" color={colors.white} width={24} height={24} />
            <Text style={styles.text}>{time}</Text>
          </View>
          <View style={styles.infoRow}>
            <Icon name="Cube" color={colors.white} width={24} height={24} />
            <Text style={styles.text}>{room}</Text>
          </View>
          <View style={styles.infoRow}>
            <Icon name="Graduation" color={colors.white} width={24} height={24} />
            <Text style={styles.text}>{instructor}</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};
