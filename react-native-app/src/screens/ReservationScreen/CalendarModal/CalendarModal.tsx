import React from 'react';
import { Modal, View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { styles } from './style';
import { Button } from '@components';

type CalendarModalProps = {
  visible: boolean;
  onClose: () => void;
  onSelectDate: (date: string) => void;
  selectedDate: string;
};

export const CalendarModal: React.FC<CalendarModalProps> = ({
  visible,
  onClose,
  onSelectDate,
  selectedDate,
}) => {
  console.log('Modale visible :', visible);

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Calendar
            onDayPress={(day: any) => {
              console.log('Date sélectionnée :', day.dateString);
              onSelectDate(day.dateString);
              onClose();
            }}
            markedDates={{
              [selectedDate]: { selected: true, selectedColor: 'blue' },
            }}
            enableSwipeMonths={true}
          />
          <Button
            onPress={onClose}
            title="Fermer"
            style={{ width: '50%', alignSelf: 'center', marginTop: 30 }}
          />
        </View>
      </View>
    </Modal>
  );
};
