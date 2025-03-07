import React, { FC } from 'react';
import { Modal, View, Text, TouchableOpacity, Image } from 'react-native';
import { Icon } from '@components/atoms';
import { map } from '@assets/Images';
import { styles } from './style';
import { colors } from '@theme';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@hooks';
import { ROUTE } from '@enums';
import { NavItem } from '@components/molecules/BookingInfo';
import { useNotifications } from '@hooks/useNotifications';
import { RoomAvailability } from '@services';
import { ReservationRequest } from '@services/Reservation';
import { API_URL } from '@env';

type ReservationModalProps = {
  isVisible: boolean;
  onClose: () => void;
  data: {
    roomName: RoomAvailability['name'];
    date: ReservationRequest['date'];
    timeSlot: [string, string];
    duration: ReservationRequest['duration'];
    floor: RoomAvailability['floor'] | null;
    capacity: RoomAvailability['capacity'] | null;
    room: RoomAvailability | null;
    photo: RoomAvailability['photo'];
  };
  notificationSettings: {
    command: boolean;
    event: boolean;
    reservation: boolean;
  };
};

export const ReservationModal: FC<ReservationModalProps> = ({
  isVisible,
  onClose,
  data,
  notificationSettings,
}) => {
  const { roomName, date, duration, timeSlot, floor, capacity, room, photo } =
    data;
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { scheduleNotification } = useNotifications();

  const formatedDuration = duration > 2 ? duration + 'min' : duration + 'h';

  const handleCloseAndNavigate = async () => {
    try {
      onClose();
      navigation.navigate(ROUTE.HOME);

      if (notificationSettings?.reservation) {
        await scheduleNotification(
          t('notification.title'),
          t('notification.reservation', { roomName: roomName || room?.name }),
          'reservation', // Type de notification
          {
            roomName: roomName || room?.name,
            date: date,
            timeSlot: timeSlot?.join(' - '),
          }
        );
      } else {
        console.log('La notification "reservation" est désactivée.');
      }
    } catch (error) {
      console.error('Error handling reservation:', error);
    }
  };

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="fade"
      onRequestClose={handleCloseAndNavigate}
    >
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={handleCloseAndNavigate}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>
            {t('reservationConflicts.confirm-resa')}
          </Text>

          <View style={styles.roomInfo}>
            {/* Salle sélectionnée */}
            <View style={styles.detailRow}>
              <Icon name="School" color={colors.white} />
              <Text style={styles.textStyle}>{roomName || room?.name} </Text>
            </View>
            <Image
              source={{ uri: `${API_URL}${photo}` }}
              style={styles.mapContainer}
            />

            <View style={styles.flexContainer}>
              {/* Date */}
              {date && (
                <View style={styles.flexItem}>
                  <Icon name="Calendar" color={colors.white} />
                  <Text style={styles.textStyle}>{date}</Text>
                </View>
              )}

              {/* Time Slot */}
              {timeSlot && (
                <View style={styles.flexItem}>
                  <Icon name="Clock" color={colors.white} />
                  <Text style={styles.textStyle}>{timeSlot.join(' - ')}</Text>
                </View>
              )}

              {/* Duration */}
              {duration && (
                <View style={styles.flexItem}>
                  <Icon name="Clock" color={colors.white} />
                  <Text style={styles.textStyle}>{formatedDuration}</Text>
                </View>
              )}
              {/* Floor */}
              {floor && (
                <View style={styles.flexItem}>
                  <Icon name="HomeLocation" color={colors.white} />
                  <Text style={styles.textStyle}>{floor || room?.floor} </Text>
                </View>
              )}

              {/* Capacity */}
              {capacity && (
                <View style={styles.flexItem}>
                  <Icon name="List" color={colors.white} />
                  <Text style={styles.textStyle}>
                    {capacity || room?.capacity} places{' '}
                  </Text>
                </View>
              )}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};
