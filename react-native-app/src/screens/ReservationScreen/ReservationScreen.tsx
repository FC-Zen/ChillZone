import { useState, useEffect } from 'react';
import { View } from 'react-native';
import { ReservationTemplate } from '@components/templates';
import { useTranslation } from 'react-i18next';
import { ReservationTemplateProps } from '@components/templates/ReservationTemplate/ReservationTemplate';
import { BottomNavbar, TopBar } from '@components';
import { styles } from './style';
import { getReservations, putReservations, RoomAvailability } from '@services';
import { ReservationModal } from './Modal';
import { CalendarModal } from './CalendarModal';

export const ReservationScreen = () => {
  const { t } = useTranslation();
  const [durations, setDurations] = useState<string[]>([]);
  const [roomTypes, setRoomTypes] = useState<string[]>([]);
  const [availableRooms, setAvailableRooms] = useState<RoomAvailability[]>([]);
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);

  const [selectedRoomId, setSelectedRoomId] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedDuration, setSelectedDuration] = useState<string>('');
  const [selectedSlot, setSelectedSlot] = useState<string>('');

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
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
      if (selectedRoomId && selectedDate && selectedDuration) {
        const durationInMinutes = convertDurationToAPIFormat(selectedDuration);

        console.log("Données envoyées à l'API:", {
          date: selectedDate,
          duration: durationInMinutes,
          type: [selectedRoomId],
        });

        try {
          const available = await putReservations(
            selectedDate,
            durationInMinutes,
            [selectedRoomId]
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
  }, [selectedRoomId, selectedDate, selectedDuration]);

  const inputs: ReservationTemplateProps['inputs'] = [
    [
      {
        placeholder: t('fields.room.type'),
        icon: 'Expand',
        subIcon: 'School',
        variant: 'select',
        data: roomTypes,
        value: selectedRoomId,
        onSelect: (selected: string) => setSelectedRoomId(selected),
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
      data: availableSlots,
      value: selectedSlot,
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
            setIsModalVisible(true);
          },
          disabled: !selectedRoomId,
        }}
        roomSelectorProps={{
          rooms: availableRooms,
          selectedRoom:
            availableRooms.find((room) => room.name === selectedRoomId) || null,
          handlePress: (selectedRoom: RoomAvailability) => {
            setSelectedRoomId(selectedRoom.name);
          },
          title: t('filters.roomsOpen'),
        }}
      />
      <BottomNavbar activeIcon="Reserve" />
      <ReservationModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        data={{}} // ici on va mettre les données de la réservation avec post AHHHHHHHHHHH
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
