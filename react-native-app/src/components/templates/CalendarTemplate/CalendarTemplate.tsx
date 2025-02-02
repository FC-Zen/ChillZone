import React, { useState } from 'react';
import { View } from 'react-native';
import { Calendar } from 'react-native-big-calendar';
import { styles } from './style';
import { BottomNavbar, CalendarHeader, TopBar } from '@components';
import { colors } from '@theme';
import 'dayjs/locale/fr';
import { CalendarEvent } from '@services';

export type CalendarTemplateProps = {
    events: CalendarEvent[];
    daysOfWeek: string[];
    startOfWeek: Date;
    selectedDate: Date;
    setSelectedDate: (date: Date) => void;
    setStartOfWeek: (date: Date) => void;
};

export const CalendarTemplate: React.FC<CalendarTemplateProps> = ({ 
    events,
    daysOfWeek,
    startOfWeek,
    selectedDate,
    setStartOfWeek,
}) => {
    const customHeader = () => {
        return (
            <CalendarHeader
                daysOfWeek={daysOfWeek}
                startOfWeek={startOfWeek}
                selectedDate={selectedDate}
            />
        );
    }

    return (
        <>
            <TopBar />
            <View style={styles.container}>
                <View style={styles.calendar}>
                    <Calendar
                        events={events.map((event) => ({
                            id: event.id,
                            title: event.title,
                            start: event.start,
                            end: event.end,
                        }))}
                        height={600}
                        mode="week"
                        locale="fr"
                        eventCellStyle={styles.calendarEvent}
                        calendarCellStyle={styles.calendarCell}
                        bodyContainerStyle={{ backgroundColor: "white" }}
                        hourStyle={styles.hourStyle}
                        minHour={7}
                        maxHour={20}
                        onPressEvent={(event) => console.log(event)}
                        renderHeader={customHeader}
                        // On change la date de début de la semaine lorsqu'on swipe vers la gauche ou la droite
                        // On soustrait 2 jours pour obtenir le début de la semaine (peut-être à changer)
                        onSwipeEnd={(date) => setStartOfWeek(new Date(date.setDate(date.getDate() - 2)))}
                    />
                </View>
            </View>
        </>
    );
};