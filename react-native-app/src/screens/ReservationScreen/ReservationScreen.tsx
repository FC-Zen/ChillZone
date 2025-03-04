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
import { CalendarModal } from './CalendarModal';

export const ReservationScreen = () => {
  const { t } = useTranslation();
  const [durations, setDurations] = useState<string[]>([]);
  const [roomTypes, setRoomTypes] = useState<string[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [room, setRoom] = useState<Room | null>(null);

  const [selectedRoom, setSelectedRoom] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedDuration, setSelectedDuration] = useState<string>('');

  const [isCalendarVisible, setIsCalendarVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const reservations = await getReservations();
      console.log('reservations: ', reservations);

      setDurations(Object.values(reservations.duration_options));
      setRoomTypes(reservations.room_types);

      const roomsData = await getRooms();
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
        data: roomTypes,
        value: selectedRoom,
        onSelect: (selected: string) => setSelectedRoom(selected),
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
            if (room) {
              setIsModalVisible(true);
            }
          },
          disabled: !room,
        }}
        roomSelectorProps={{
          rooms,
          handlePress: (selectedRoom) => {
            setRoom(selectedRoom);
          },
          title: t('headers.roomAvailable'),
        }}
        selectedRoom={room}
      />
      <BottomNavbar activeIcon="Reserve" />
      <ReservationModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        data={{}}
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
