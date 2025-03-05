import React, { useMemo } from 'react';
import { Modal, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { styles } from './style';
import { Button } from '@components';
import { colors } from '@theme';

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
  const disabledDates = useMemo(() => {
    const dates: {
      [key: string]: { disabled: boolean; disableTouchEvent: boolean };
    } = {};

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < 180; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      const dateString = date.toISOString().split('T')[0];

      const isWeekend = date.getDay() === 0 || date.getDay() === 6;
      const isPastDate = date < today;

      if (isWeekend || isPastDate) {
        dates[dateString] = {
          disabled: true,
          disableTouchEvent: true,
        };
      }
    }

    return dates;
  }, []);

  const markedDates = useMemo(() => {
    return {
      ...disabledDates,
      [selectedDate]: {
        selected: true,
        selectedColor: 'blue',
        ...(disabledDates[selectedDate] || {}),
      },
    };
  }, [selectedDate, disabledDates]);

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Calendar
            onDayPress={(day: any) => {
              if (!disabledDates[day.dateString]) {
                console.log('Date sélectionnée :', day.dateString);
                onSelectDate(day.dateString);
                onClose();
              }
            }}
            markedDates={markedDates}
            enableSwipeMonths={true}
            minDate={new Date().toISOString().split('T')[0]}
            theme={{
              textDisabledColor: colors.silver,
            }}
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
