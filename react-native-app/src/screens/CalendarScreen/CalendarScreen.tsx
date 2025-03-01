import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { View } from 'react-native';
import { styles } from './style';
import { BottomNavbar, CalendarTemplate } from '@components';
import { Calendar, getCalendarEvents } from '@services/CalendarServices';
import { useTranslation } from 'react-i18next';
import { set } from 'zod';

export const CalendarScreen = () => {
  const { t } = useTranslation();
  const monthsName = [
    t('months.january'),
    t('months.february'),
    t('months.march'),
    t('months.april'),
    t('months.may'),
    t('months.june'),
    t('months.july'),
    t('months.august'),
    t('months.september'),
    t('months.october'),
    t('months.november'),
    t('months.december'),
  ];
  const daysName = [
    t('days.monday'),
    t('days.tuesday'),
    t('days.wednesday'),
    t('days.thursday'),
    t('days.friday'),
    t('days.saturday'),
    t('days.sunday'),
  ].map((day) => day[0].toUpperCase());

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [startOfWeek, setStartOfWeek] = useState(new Date());
  const [selectState, setSelectState] = useState<'open' | 'closed'>(
    'closed'
  );
  const [selectedMonth, setSelectedMonth] = useState(monthsName[new Date().getMonth()]);

  const [events, setEvents] = useState<Calendar>({
    id: 0,
    title: 'Calendrier',
    url: '',
    events: [],
  });
  const [adeModal, setAdeModal] = useState(false);
  const [adeLink, setAdeLink] = useState('');
  const [helpModal, setHelpModal] = useState(false);
  const [courseModal, setCourseModal] = useState(false);
  
  const determineYear = (month: string) => {
      const currentYear = new Date().getFullYear();
      const currentMonth = new Date().getMonth();
      const selected = monthsName.indexOf(month);
      return currentMonth >= selected ? currentYear : currentYear - 1;
  }

  const determineDate = (month: string) => {
      const year = determineYear(month);
      const monthIndex = monthsName.indexOf(month);
      return new Date(year, monthIndex, 1);
  }

  const eventsMemo = useMemo(() => events, [events]);

  const fetchData = async () => {
    const events = await getCalendarEvents();
    if (events !== null) setEvents(events);
  };

  useEffect(() => {
    fetchData();
    eventsMemo;
  }, []);

  const handleSelect = useCallback((item: string) => {
    setSelectedMonth(item);
    setSelectState(selectState === 'open' ? 'closed' : 'open');
    setStartOfWeek(determineDate(item));
  }, [selectedMonth, selectState]);

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
        setSelectState={() =>
          setSelectState(selectState === 'open' ? 'closed' : 'open')
        }
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
        monthNames={monthsName}
        courseModal={courseModal}
        setCourseModal={setCourseModal}
        adeModal={adeModal}
        setAdeModal={setAdeModal}
        adeLink={adeLink}
        setAdeLink={setAdeLink}
        helpModal={helpModal}
        setHelpModal={setHelpModal}
        onSelect={handleSelect}
        onSubmitLink={() => {
          fetchData();
          setAdeModal(false);
          setAdeLink('');
        }}
      />
      <BottomNavbar activeIcon="Calendar" />
    </View>
  );
};
