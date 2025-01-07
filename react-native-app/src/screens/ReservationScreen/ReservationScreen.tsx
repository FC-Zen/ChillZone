import { useState, useEffect } from 'react';
import { View } from 'react-native';
import { ReservationTemplate } from '@components/templates';
import { useTranslation } from 'react-i18next';
import { ReservationTemplateProps } from '@components/templates/ReservationTemplate/ReservationTemplate';
import { BottomNavbar, TopBar } from '@components';
import { styles } from './style';
import { getReservations } from '@services';
import { getRooms, Room } from '@services/RoomServices';

export const ReservationScreen = () => {
  const { t } = useTranslation();
  const [dayReservations, setDayReservations] = useState<string[]>([]);
  const [timeSlots, setTimeSlots] = useState<string[]>([]);
  const [durations, setDurations] = useState<string[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);

  const calculateDuration = (startTime: string, endTime: string): string => {
    const [startHours, startMinutes] = startTime.split('h').map(Number);
    const [endHours, endMinutes] = endTime.split('h').map(Number);

    const startTotalMinutes = startHours * 60 + (startMinutes || 0);
    const endTotalMinutes = endHours * 60 + (endMinutes || 0);

    const durationHours = Math.abs(endTotalMinutes - startTotalMinutes) / 60;

    return durationHours === 1 ? 'Court : 1h' : 'Long : 2h';
  };

  useEffect(() => {
    const fetchData = async () => {
      const reservations = await getReservations();
      const roomsData = await getRooms();

      const dates = reservations.map(
        (reservation) => reservation.day_reservation
      );
      setDayReservations(dates);

      const times = reservations.map(
        (reservation) => `${reservation.start_time} - ${reservation.end_time}`
      );
      setTimeSlots(times);

      const calculatedDurations = reservations.map((reservation) =>
        calculateDuration(reservation.start_time, reservation.end_time)
      );
      setDurations(calculatedDurations);
      setRooms(roomsData);
    };

    fetchData();
  }, []);

  const inputs: ReservationTemplateProps['inputs'] = [
    [
      {
        placeholder: t('fields.room.type'),
        icon: 'Expand',
        subIcon: 'School',
        variant: 'select',
        data: [t('filters.acoustic'), t('filters.classroom')],
        onSelect: (selected: string) => console.log('Selected:', selected),
      },
      {
        placeholder: t('fields.common.date'),
        icon: 'Calendar',
        variant: 'select',
        data: dayReservations,
        onSelect: (selected: string) => console.log('Selected date:', selected),
      },
      {
        placeholder: t('fields.room.hours'),
        icon: 'Clock',
        variant: 'select',
        data: durations,
        onSelect: (selected: string) =>
          console.log('Selected time slot:', selected),
      },
    ],
    [
      {
        placeholder: t('fields.room.schedules'),
        icon: 'Calendar',
        variant: 'select',
        data: timeSlots,
        onSelect: (selected: string) => console.log('Selected:', selected),
      },
    ],
  ];

  const roomSelectorProps = {
    title: t('filters.roomsOpen'),
    rooms:
      rooms
        ?.filter((room) => room)
        .map((room) => ({
          name: room?.name || '',
          floor: room?.floor || 0,
          capacity: room?.capacity || 0,
          photo_link: room?.photo_link || '',
        })) || [],
  };

  return (
    <View style={styles.container}>
      <TopBar />
      <ReservationTemplate
        inputs={inputs}
        titleHeader={t('headers.reservation')}
        subTitle={t('filters.filterTitle')}
        subTitle2={t('filters.hoursOpen')}
        roomSelectorProps={roomSelectorProps}
        buttonProps={{
          title: t('headers.reservation'),
          onPress: () => console.log('Reserve button pressed'),
        }}
      />
      <BottomNavbar activeIcon="Reserve" />
    </View>
  );
};
