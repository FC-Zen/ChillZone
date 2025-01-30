import React from 'react';
import { View } from 'react-native';
import { Calendar } from 'react-native-big-calendar';
import { styles } from './style';
import { Button, CalendarCell, CalendarHeader, Select, TopBar } from '@components';
import 'dayjs/locale/fr';
import { CalendarEvent } from '@services';
import { colors, typography } from '@theme';

export type CalendarTemplateProps = {
    events: CalendarEvent[];
    daysOfWeek: string[];
    startOfWeek: Date;
    selectedDate: Date;
    setSelectedDate: (date: Date) => void;
    setStartOfWeek: (date: Date) => void;
    selectState: 'open' | 'closed';
    setSelectState: () => void;
    selectedMonth: string;
    setSelectedMonth: (month: string) => void;
    monthNames: string[];
};

export const CalendarTemplate: React.FC<CalendarTemplateProps> = ({ 
    events,
    daysOfWeek,
    startOfWeek,
    selectedDate,
    setStartOfWeek,
    selectState,
    setSelectState,
    selectedMonth,
    setSelectedMonth,
    monthNames,
}) => {
    const customHeader = () => {
        return (
            <CalendarHeader
                daysOfWeek={daysOfWeek}
                startOfWeek={startOfWeek}
                selectedDate={selectedDate}
            />
        );
    };

    return (
        <>
            <TopBar />
            <View style={styles.rowContainer}>
                <Select
                    items={monthNames}
                    selectedValue={selectedMonth}
                    setSelectedValue={setSelectedMonth}
                    state={selectState}
                    setState={setSelectState}
                />
                <Button
                    title="ADE"
                    onPress={() => console.log('open overlay')}
                    variant='icon'
                    icon={{ name: 'Chain', color: colors.white, width: 16, height: 16 }}
                    style={styles.calendarLinkButton}
                    textFont={typography.h2.fontFamily}
                    textSize={typography.h3.fontSize}
                />
            </View>
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
                        onPressEvent={(event) => { console.log(event) }}
                        renderHeader={customHeader}
                        eventCellTextColor={colors.white}
                        renderEvent={(event, TouchableOpacityProps) => <CalendarCell event={event} touchableOpacityProps={TouchableOpacityProps} brutEvents={events} />}
                        onSwipeEnd={(date) => setStartOfWeek(date)}
                    />
                </View>
            </View>
        </>
    );
};