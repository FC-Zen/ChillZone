import { useState, useEffect, useCallback } from 'react';
import { View } from 'react-native';
import { ReservationTemplate } from '@components/templates';
import { useTranslation } from 'react-i18next';
import { ReservationTemplateProps } from '@components/templates/ReservationTemplate/ReservationTemplate';
import { BottomNavbar, TopBar } from '@components';
import { styles } from './style';
import {
  createReservation,
  getReservations,
  putReservations,
  RoomAvailability,
} from '@services';
import { ReservationModal } from './Modal';
import { CalendarModal } from './CalendarModal';

export const ReservationScreen = () => {
  const { t } = useTranslation();
  const [durations, setDurations] = useState<string[]>([]);
  const [roomTypes, setRoomTypes] = useState<string[]>([]);
  const [availableRooms, setAvailableRooms] = useState<RoomAvailability[]>([]);
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);

  const [selectedRoomId, setSelectedRoomId] = useState<string>('');
  const [selectedRoomType, setSelectedRoomType] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedDuration, setSelectedDuration] = useState<string>('');
  const [selectedSlot, setSelectedSlot] = useState<string>('');

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);

  const [findedRoom, setFindedRoom] = useState<RoomAvailability | null>(null);
  const [findedRoomSlots, setFindedRoomSlots] = useState<string[]>([]);

  const findRoom = useCallback(
    (roomName: string | number) => {
      let room: RoomAvailability | undefined;
      if (typeof roomName === 'string') {
        room = availableRooms.find((room) => room.name === roomName);
      } else if (typeof roomName === 'number') {
        room = availableRooms.find((room) => room.id === roomName);
      }
      if (room) {
        setFindedRoom(room);
        setFindedRoomSlots(
          room.available_slots
            .map((slot) => formatTimeForDisplay(slot[0], slot[1]))
            .sort()
        );
      }
    },
    [availableRooms]
  );

  useEffect(() => {
    const fetchData = async () => {
      console.log('Récupération des données de réservation...');
      const reservations = await getReservations();
      console.log('Room Types disponibles:', reservations.room_types);

      setDurations(Object.values(reservations.duration_options));
      setRoomTypes(reservations.room_types);
    };
    fetchData();
  }, []);

  const convertDurationToAPIFormat = (duration: string): number => {
    if (duration.includes('h')) {
      return parseInt(duration.split('h')[0], 10) * 60; // Convertit les heures en minutes
    } else if (duration.includes('m')) {
      return parseInt(duration.split('m')[0], 10);
    }
    return 0;
  };

  // Fonction pour formater les créneaux horaires en HHhMM - HHhMM
  const formatTimeForDisplay = (start: string, end: string): string => {
    if (!start || !end || !start.includes(':') || !end.includes(':')) {
      return 'Invalid Time Format';
    }

    const [startHours, startMinutes] = start.split(':');
    const [endHours, endMinutes] = end.split(':');

    if (!startHours || !startMinutes || !endHours || !endMinutes) {
      return 'Invalid Time Format';
    }

    return `${startHours}h${startMinutes} - ${endHours}h${endMinutes}`;
  };

  useEffect(() => {
    const checkAvailability = async () => {
      if (selectedRoomType && selectedDate && selectedDuration) {
        const durationInMinutes = convertDurationToAPIFormat(selectedDuration);

        console.log("Données envoyées à l'API:", {
          date: selectedDate,
          duration: durationInMinutes,
          type: [selectedRoomType],
        });

        try {
          const available = await putReservations(
            selectedDate,
            durationInMinutes,
            [selectedRoomType]
          );

          const availableRoomsMapped = available.map((room) => ({
            id: room.id,
            name: room.name,
            floor: room.floor.toString(),
            capacity: room.capacity,
            available_slots: room.available_slots,
            establishment: room.establishment,
            photo: room.photo,
          }));

          setAvailableRooms(availableRoomsMapped);

          if (selectedRoomId) findRoom(selectedRoomId);

          if (available.length > 0) {
            const formattedSlots = available[0].available_slots.map((slot) =>
              formatTimeForDisplay(slot[0], slot[1])
            );
            setAvailableSlots(formattedSlots);
          } else {
            setAvailableSlots([]);
          }
        } catch (error: any) {
          console.error('Erreur détaillée:', {
            status: error.response?.status,
            data: error.response?.data,
            message: error.message,
          });
        }
      }
    };

    checkAvailability();
  }, [selectedDate, selectedDuration]);

  useEffect(() => {
    if (selectedRoomId && availableRooms.length > 0) {
      setSelectedSlot('');
      findRoom(selectedRoomId);
    }
  }, [selectedRoomId, availableRooms, findRoom]);

  const onSendReservation = async () => {
    const response = await createReservation(
      availableRooms.find((room) => room.name === selectedRoomId)?.id || 0,
      selectedSlot.split(' - ')[0],
      convertDurationToAPIFormat(selectedDuration),
      selectedDate
    );
    console.log('Réponse de la réservation:', response);
  };

  const inputs: ReservationTemplateProps['inputs'] = [
    [
      {
        placeholder: t('fields.room.type'),
        icon: 'Expand',
        subIcon: 'School',
        variant: 'select',
        data: roomTypes,
        value: selectedRoomType,
        onSelect: (selected: string) => setSelectedRoomType(selected),
      },
      {
        placeholder: t('fields.common.date'),
        icon: 'Calendar',
        variant: 'modal-select',
        value: selectedDate,
        onPress: () => {
          setIsCalendarVisible(true);
        },
      },
      {
        placeholder: t('fields.room.hours'),
        icon: 'Clock',
        variant: 'select',
        data: durations,
        value: selectedDuration,
        onSelect: (selected: string) => setSelectedDuration(selected),
      },
    ],
  ];

  if (selectedRoomId && availableSlots.length > 0) {
    inputs[0].push({
      placeholder: t('fields.room.schedules'),
      icon: 'Clock',
      variant: 'select',
      data: findedRoomSlots,
      value: selectedSlot,
      disabled: !selectedRoomId,
      onSelect: (selected: string) => setSelectedSlot(selected),
    });
  }

  return (
    <View style={styles.container}>
      <TopBar />
      <ReservationTemplate
        inputs={inputs}
        titleHeader={t('headers.reservation')}
        subTitle={t('filters.filterTitle')}
        subTitle2={t('filters.hoursOpen')}
        buttonProps={{
          title: t('headers.reservation'),
          onPress: () => {
            onSendReservation();
            setIsModalVisible(true);
          },
          disabled: !selectedRoomId,
        }}
        roomSelectorProps={{
          rooms: availableRooms,
          selectedRoom:
            availableRooms.find((room) => room.name === selectedRoomId) || null,
          handlePress: (selectedRoom: RoomAvailability) => {
            findRoom(selectedRoom.name);
            setSelectedRoomId(selectedRoom.name);
          },
          title: t('filters.roomsOpen'),
        }}
        disabled={
          !selectedSlot || !selectedDuration || !selectedDate || !selectedRoomId
        }
      />
      <BottomNavbar activeIcon="Reserve" />
      <ReservationModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        data={{
          roomName: selectedRoomId,
          date: selectedDate,
          timeSlot: selectedSlot.split(' - ') as [string, string],
          duration: parseInt(selectedDuration.split('h')[0]),
          floor: findedRoom?.floor || null,
          capacity: findedRoom?.capacity || null,
          room: findedRoom,
          photo: findedRoom?.photo || '',
        }}
      />
      <CalendarModal
        visible={isCalendarVisible}
        onClose={() => setIsCalendarVisible(false)}
        onSelectDate={(date) => setSelectedDate(date)}
        selectedDate={selectedDate}
      />
    </View>
  );
};
