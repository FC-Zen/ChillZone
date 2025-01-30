import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './style';

export type CalendarHeaderProps = {
    daysOfWeek: string[];
    startOfWeek: Date;
    selectedDate: Date;
};

export const CalendarHeader: React.FC<CalendarHeaderProps> = ({
    daysOfWeek,
    startOfWeek,
    selectedDate,
}) => {
    return (
        <View style={styles.headerContainer}>
          {daysOfWeek.map((day, index) => {
            const currentDate = new Date(startOfWeek);
            currentDate.setDate(startOfWeek.getDate() + index); // Calculer chaque jour de la semaine
  
            const isSelected = selectedDate.toDateString() === currentDate.toDateString();
  
            return (
              <View
                key={index}
                style={[
                  styles.dayContainer,
                  isSelected && styles.selectedDayContainer,
                ]}
              >
                <Text style={[styles.dayText, isSelected && styles.selectedText]}>
                  {day}
                </Text>
                <Text
                  style={[
                    styles.dateText,
                    isSelected && styles.selectedText,
                  ]}
                >
                  {currentDate.getDate()}
                </Text>
              </View>
            );
          })}
        </View>
      );
}