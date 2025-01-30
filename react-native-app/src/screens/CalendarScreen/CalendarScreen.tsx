import React from 'react';
import { View } from 'react-native';
import { Calendar } from 'react-native-big-calendar';
import { styles } from './style';
import { BottomNavbar, CalendarTemplate } from '@components';
import calendar from '@assets/data/calendar.json';

const events = calendar;

export const CalendarScreen = () => {
    const [selectedDate, setSelectedDate] = React.useState(new Date(2025, 0, 8));
    const [startOfWeek, setStartOfWeek] = React.useState(new Date(2025, 0, 6));

    return (
        <View style={styles.container}>
            <CalendarTemplate
                events={events}
                daysOfWeek={['D', 'L', 'M', 'M', 'J', 'V', 'S']}
                startOfWeek={startOfWeek}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                setStartOfWeek={setStartOfWeek}
            />
            <BottomNavbar activeIcon="Calendar" />
        </View>
    );
};
