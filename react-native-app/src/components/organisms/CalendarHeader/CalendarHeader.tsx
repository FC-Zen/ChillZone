import React from 'react';
import { View, Text } from 'react-native';
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
    // Définir le début de la semaine au dimanche précédent
    // Explication du calcul :
    // startOfWeek.getDay() : Récupérer le jour de la semaine (0 = dimanche, 1 = lundi, ..., 6 = samedi)
    // startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay()) : Définir le début de la semaine
    // Exemple : Si on est le mardi 15 juin 2021, startOfWeek.getDay() = 2
    // startOfWeek.setDate(startOfWeek.getDate() - 1) : startOfWeek = dimanche 13
    startOfWeek = new Date(startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay() + 1));

    return (
        <View style={styles.headerContainer}>
          {daysOfWeek.map((day, index) => {
            const currentDate = new Date(startOfWeek);
            currentDate.setDate(startOfWeek.getDate() + (index)); // Calculer chaque jour de la semaine

            // console.log("currentDate", currentDate);
  
            const isSelected = selectedDate.toDateString() === currentDate.toDateString();
  
            return (
              <View
                key={index}
                style={[
                  styles.dayContainer,
                  isSelected && styles.selectedDayContainer,
                ]}
              >
                <Text style={styles.dayText}>
                  {day}
                </Text>
                <View style={isSelected && styles.selectedDateContainer}>
                  <Text
                    style={[
                      styles.dateText,
                      isSelected && styles.selectedDate,
                    ]}
                  >
                    {currentDate.getDate()}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      );
}