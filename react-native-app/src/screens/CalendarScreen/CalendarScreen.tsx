import React, { useEffect } from 'react';
import { View } from 'react-native';
import { styles } from './style';
import { BottomNavbar, CalendarTemplate } from '@components';
import { Calendar, getCalendarEvents } from '@services/CalendarServices';

export const CalendarScreen = () => {
    const [selectedDate, setSelectedDate] = React.useState(new Date(2025, 0, 8));
    const [startOfWeek, setStartOfWeek] = React.useState(new Date(2025, 0, 6));
    const [events, setEvents] = React.useState<Calendar>({ events: [] });

    useEffect(() => {
        const fetchData = async () => {
            const events = await getCalendarEvents();
            setEvents(events);
        }
        fetchData();
    }, []);

    return (
        <View style={styles.container}>
            <CalendarTemplate
                events={events.events}
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
