import { useState, useEffect } from 'react';
import { View } from 'react-native';
import { ReservationTemplate } from '@components/templates';
import { useTranslation } from 'react-i18next';
import { ReservationTemplateProps } from '@components/templates/ReservationTemplate/ReservationTemplate';
import { BottomNavbar, TopBar } from '@components';
import { styles } from './style';
import { getReservations } from '@services';
import { getRooms, Room } from '@services/RoomServices';
import { ReservationModal } from './Modal';

export const ReservationScreen = () => {
  const { t } = useTranslation();
  const [dayReservations, setDayReservations] = useState<string[]>([]);
  const [timeSlots, setTimeSlots] = useState<string[]>([]);
  const [durations, setDurations] = useState<string[]>([]);
  const [roomTypes, setRoomTypes] = useState<string[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [room, setRoom] = useState<Room | null>(null);

  const [selectedRoom, setSelectedRoom] = useState<string>('');

  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');
  const [selectedDuration, setSelectedDuration] = useState<string>('');

  // Calcul de la durée entre le début et la fin
  const calculateDuration = (startTime: string, endTime: string): string => {
    const [startHours, startMinutes] = startTime.split('h').map(Number);
    const [endHours, endMinutes] = endTime.split('h').map(Number);

    const startTotalMinutes = startHours * 60 + (startMinutes || 0);
    const endTotalMinutes = endHours * 60 + (endMinutes || 0);

    const durationHours = Math.abs(endTotalMinutes - startTotalMinutes) / 60;

    return durationHours === 1 ? 'Court : 1h' : 'Long : 2h';
  };

  const getModalData = () => {
    if (selectedRoom || selectedDate || selectedTimeSlot || selectedDuration) {
      return {
        roomName: selectedRoom || '',
        date: selectedDate ? [selectedDate] : [],
        duration: selectedDuration ? [selectedDuration] : [],
        timeSlot: selectedTimeSlot ? [selectedTimeSlot] : [],
      };
    } else {
      return {
        roomName: room?.name || 'Salle inconnue',
        floor: room?.floor?.toString() || 'Étage inconnu',
        capacity: room?.capacity?.toString() || 'Capacité inconnue',
        tag_label: roomTypes[0] || 'Type inconnu',
      };
    }
  };

  const handleRoomSelect = (room: Room) => {
    setSelectedRoom(room.name || '');
    setRoom(room);
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

      const roomTypes = roomsData.map((room) => room.tag_label || '') || [];

      setRoomTypes(roomTypes);
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
        onSelect: (selected: string) => setSelectedRoom(selected),
      },
      {
        placeholder: t('fields.common.date'),
        icon: 'Calendar',
        variant: 'select',
        data: dayReservations,
        onSelect: (selected: string) => setSelectedDate(selected),
      },
      {
        placeholder: t('fields.room.hours'),
        icon: 'Clock',
        variant: 'select',
        data: durations,
        onSelect: (selected: string) => setSelectedDuration(selected),
      },
    ],
    [
      {
        placeholder: t('fields.room.schedules'),
        icon: 'Calendar',
        variant: 'select',
        data: timeSlots,
        onSelect: (selected: string) => setSelectedTimeSlot(selected),
        disabled: selectedDuration === '',
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
    onRoomSelect: handleRoomSelect,
    handlePress: setRoom,
    selectedRoom: room,
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
          onPress: () => setIsModalVisible(true),
        }}
      />
      <BottomNavbar activeIcon="Reserve" />
      <ReservationModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        data={getModalData()}
      />
    </View>
  );
};
