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

  const [selectedRoomId, setSelectedRoomId] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedDuration, setSelectedDuration] = useState<string>('');
  const [selectedRoomType, setSelectedRoomType] = useState<string>('');

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

  // Fonction pour convertir la durée en minutes
  const convertDurationToMinutes = (duration: string): number => {
    if (duration.includes('h')) {
      const hours = parseInt(duration.split('h')[0], 10);
      return hours * 60;
    }
    return 0;
  };

  const selectedDurationInMinutes = convertDurationToMinutes(selectedDuration);

  useEffect(() => {
    const checkAvailability = async () => {
      if (selectedRoomId && selectedDate && selectedDuration) {
        try {
          const available = await putReservations(
            selectedDate,
            selectedDurationInMinutes,
            [selectedRoomId]
          );

          const availableRoomsMapped = available.map(
            (roomAvailability: RoomAvailability) => ({
              id: roomAvailability.id,
              name: roomAvailability.name,
              floor: roomAvailability.floor.toString(),
              capacity: roomAvailability.capacity,
              available_slots: roomAvailability.available_slots,
              establishment: roomAvailability.establishment,
              photo: roomAvailability.photo,
            })
          );

          setAvailableRooms(availableRoomsMapped);
        } catch (error) {
          console.error('Erreur lors de la mise à jour des salles:', error);
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
            availableRooms.find(
              (room) => room.id.toString() === selectedRoomId
            ) || null,
          handlePress: (selectedRoom: RoomAvailability) => {
            setSelectedRoomId(selectedRoom.id.toString());
          },
          title: t('headers.roomAvailable'),
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
