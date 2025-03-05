import React, { useState } from 'react';
import { View } from 'react-native';
import { Calendar } from 'react-native-big-calendar';
import { styles } from './style';
import { Button, CalendarCell, CalendarHeader, Select, TopBar } from '@components';
import 'dayjs/locale/fr';
import { CalendarEvent } from '@services';
import { colors, typography } from '@theme';
import { AdeModal, CourseDetailsModal, HelpModal } from '@components/organisms';
import { set } from 'zod';

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
    courseModal: boolean;
    setCourseModal: (value: boolean) => void;
    adeModal: boolean;
    setAdeModal: (value: boolean) => void;
    adeLink: string;
    setAdeLink: (value: string) => void;
    helpModal: boolean;
    setHelpModal: (value: boolean) => void;
    onSelect: (item: string) => void;
    onSubmitLink: () => void;
    onRefresh: () => void;
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
    courseModal,
    setCourseModal,
    adeModal,
    setAdeModal,
    adeLink,
    setAdeLink,
    helpModal,
    setHelpModal,
    onSelect,
    onSubmitLink,
    onRefresh,
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

    const [actualEvent, setActualEvent] = useState<CalendarEvent | null>(null);

    return (
        <>
            <TopBar />
            <View style={styles.rowContainer}>
                <Select
                    items={monthNames}
                    selectedValue={selectedMonth}
                    state={selectState}
                    setState={setSelectState}
                    onSelect={onSelect}
                />

                <View style={styles.buttonGroup} >
                    <Button
                        title="ADE"
                        onPress={() => setAdeModal(true)}
                        variant='icon'
                        icon={{ name: 'Chain', color: colors.white, width: 16, height: 16 }}
                        style={styles.calendarLinkButton}
                        textFont={typography.h2.fontFamily}
                        textSize={typography.h3.fontSize}
                    />
                    <Button
                        title=""
                        onPress={onRefresh}
                        variant='iconOnly'
                        icon={{ name: 'Refresh', color: colors.white, width: 16, height: 16 }}
                        color={colors.resolutionBlue}
                        style={styles.refreshButton}
                    />
                </View>

            </View>
            <View style={styles.container}>
                <View style={styles.calendar}>
                    <Calendar
                        events={events.map((event) => ({
                            id: event.id,
                            title: event.title,
                            start: event.start_time,
                            end: event.end_time,
                        }))}
                        date={startOfWeek}
                        height={600}
                        mode="week"
                        locale="fr"
                        eventCellStyle={styles.calendarEvent}
                        calendarCellStyle={styles.calendarCell}
                        bodyContainerStyle={{ backgroundColor: "white" }}
                        hourStyle={styles.hourStyle}
                        minHour={7}
                        maxHour={20}
                        onPressEvent={(event) => { setCourseModal(true); setActualEvent(events.find((e) => e.id === event.id) || null); }}
                        renderHeader={customHeader}
                        eventCellTextColor={colors.white}
                        renderEvent={(event, TouchableOpacityProps) => <CalendarCell event={event} touchableOpacityProps={TouchableOpacityProps} brutEvents={events} />}
                        onSwipeEnd={(date) => {setStartOfWeek(date); setSelectedMonth(monthNames[date.getMonth()]);}}
                        weekStartsOn={1}
                        activeDate={startOfWeek}
                    />
                </View>
            </View>
            <CourseDetailsModal 
                isOpen={courseModal}
                onClose={() => {setAdeModal(false); setCourseModal(false);}}
                courseDetails={{
                    title: actualEvent?.title || '',
                    date: actualEvent?.start_time.toLocaleDateString() || '',
                    time: `${actualEvent?.start_time.toLocaleTimeString().replace(/:\d\d/, '')} - ${actualEvent?.end_time.toLocaleTimeString().replace(/:\d\d/, '')}`,
                    room: actualEvent?.location || '',
                    instructor: actualEvent?.professor.toString().replaceAll(',', ', ') || '',
                }}
            />
            <AdeModal  
                isOpen={adeModal}
                onClose={() => {setCourseModal(false); setAdeModal(false);}}
                onOpenHelp={() => {setHelpModal(true); setAdeModal(false); setCourseModal(false);}}
                adeLink={adeLink}
                setAdeLink={setAdeLink}
                onSubmit={onSubmitLink}
            />
            <HelpModal 
                isOpen={helpModal}
                onClose={() => { setHelpModal(false); setAdeModal(true); setCourseModal(false); }}
            />
        </>
    );
};