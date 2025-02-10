import React, { useEffect } from 'react';
import { View } from 'react-native';
import { styles } from './style';
import { BottomNavbar, CalendarTemplate } from '@components';
import { Calendar, getCalendarEvents } from '@services/CalendarServices';
import { useTranslation } from 'react-i18next';

export const CalendarScreen = () => {
    const { t } = useTranslation();
    const monthsName = [t('months.january'), t('months.february'), t('months.march'), t('months.april'), t('months.may'), t('months.june'), t('months.july'), t('months.august'), t('months.september'), t('months.october'), t('months.november'), t('months.december')];
    const daysName = [t('days.monday'), t('days.tuesday'), t('days.wednesday'), t('days.thursday'), t('days.friday'), t('days.saturday'), t('days.sunday')]
    .map((day) => day[0].toUpperCase());

    const [selectedDate, setSelectedDate] = React.useState(new Date());
    const [startOfWeek, setStartOfWeek] = React.useState(new Date());
    const [selectState, setSelectState] = React.useState<'open' | 'closed'>('closed');
    const [selectedMonth, setSelectedMonth] = React.useState(monthsName[0]);


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
                daysOfWeek={daysName}
                startOfWeek={startOfWeek}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                setStartOfWeek={setStartOfWeek}
                selectState={selectState}
                setSelectState={() => setSelectState(selectState === 'open' ? 'closed' : 'open')}
                selectedMonth={selectedMonth}
                setSelectedMonth={setSelectedMonth}
                monthNames={monthsName}
            />
            <BottomNavbar activeIcon="Calendar" />
        </View>
    );
};
