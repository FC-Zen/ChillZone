import React, { FC } from 'react';
import { Modal, View, Text, TouchableOpacity, Image } from 'react-native';
import { Icon } from '@components/atoms';
import { map } from '@assets/Images';
import { styles } from './style';
import { colors } from '@theme';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@hooks';
import { ROUTE } from '@enums';
import { Room } from '@services/RoomServices';
import { NavItem } from '@components/molecules/BookingInfo';
import { useNextBooking } from '@contexts';
import { useNotifications } from '@hooks/useNotifications';

type ReservationModalProps = {
  isVisible: boolean;
  onClose: () => void;
  data: {
    roomName?: string;
    date?: string[];
    timeSlot?: string[];
    duration?: string[];
    floor?: string;
    capacity?: string;
    room?: Room;
  };
};

export const ReservationModal: FC<ReservationModalProps> = ({
  isVisible,
  onClose,
  data,
}) => {
  const { roomName, date, duration, timeSlot, floor, capacity, room } = data;
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { nextBooking, updateNextBooking } = useNextBooking();
  const { scheduleNotification } = useNotifications();

  const transformDataToNavItems = (): NavItem[] => {
    const navItems: NavItem[] = [];

    if (roomName || room?.name) {
      navItems.push({
        icon: 'School',
        label: roomName || room?.name || '',
      });
    }

    if (date?.[0]) {
      navItems.push({
        icon: 'Calendar',
        label: date[0],
      });
    }

    if (timeSlot?.[0]) {
      navItems.push({
        icon: 'Clock',
        label: timeSlot[0],
      });
    }

    if (duration?.[0]) {
      navItems.push({
        icon: 'Calendar',
        label: duration[0],
      });
    }

    if (floor || room?.floor) {
      navItems.push({
        icon: 'HomeLocation',
        label: `Etage ${floor || room?.floor}`,
      });
    }

    if (capacity || room?.capacity) {
      navItems.push({
        icon: 'List',
        label: `${capacity || room?.capacity} places`,
      });
    }

    return navItems;
  };

  const handleCloseAndNavigate = async () => {
    // Mise à jour de la réservation
    try {
      onClose();
      updateNextBooking([...nextBooking, transformDataToNavItems()]);

      navigation.navigate(ROUTE.HOME);

      if (roomName || room?.name) {
        await scheduleNotification(
          t('notification.title'),
          t('notification.reservation', { roomName: roomName || room?.name }),
          {
            roomName: roomName || room?.name,
            date: date?.[0],
            timeSlot: timeSlot?.[0],
          }
        );
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
            <Image source={map} style={styles.mapContainer} />

            <View style={styles.flexContainer}>
              {/* Date */}
              {date && (
                <View style={styles.flexItem}>
                  <Icon name="Calendar" color={colors.white} />
                  <Text style={styles.textStyle}>{date?.[0]}</Text>
                </View>
              )}

              {/* Time Slot */}
              {timeSlot && (
                <View style={styles.flexItem}>
                  <Icon name="Clock" color={colors.white} />
                  <Text style={styles.textStyle}>{timeSlot?.[0]}</Text>
                </View>
              )}

              {/* Duration */}
              {duration && (
                <View style={styles.flexItem}>
                  <Icon name="Calendar" color={colors.white} />
                  <Text style={styles.textStyle}>{duration?.[0]}</Text>
                </View>
              )}
              {/* Floor */}
              {floor && (
                <View style={styles.flexItem}>
                  <Icon name="HomeLocation" color={colors.white} />
                  <Text style={styles.textStyle}>
                    Etage {floor || room?.floor}{' '}
                  </Text>
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
