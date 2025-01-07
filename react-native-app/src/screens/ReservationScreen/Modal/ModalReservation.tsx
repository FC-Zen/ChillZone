import React, { FC } from 'react';
import { Modal, View, Text, TouchableOpacity, Image } from 'react-native';
import { Icon } from '@components/atoms';
import { map } from '@assets/Images';
import { styles } from './style';
import { colors } from '@theme';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@hooks';
import { ROUTE } from '@enums';

type ReservationModalProps = {
  isVisible: boolean;
  onClose: () => void;
  data: {
    roomName: string;
    date: string;
    timeSlot: string;
    floor: string;
  };
};

export const ReservationModal: FC<ReservationModalProps> = ({
  isVisible,
  onClose,
  data,
}) => {
  const { roomName, date, timeSlot, floor } = data;
  const { t } = useTranslation();
  const navigation = useNavigation();

  const handleCloseAndNavigate = () => {
    onClose();
    navigation.navigate(ROUTE.HOME);
  };
  console.log(data);
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
            <View style={styles.detailRow}>
              <Icon name="Cube" color={colors.white} />
              <Text style={styles.roomName}>Salle {roomName}</Text>
            </View>

            <Image source={map} style={styles.mapContainer} />

            <View style={styles.reservationDetails}>
              <View style={styles.detailRow}>
                <Icon name="Calendar" color={colors.white} />
                <Text>{date}</Text>
              </View>

              <View style={styles.detailRow}>
                <Icon name="Clock" color={colors.white} />
                <Text>{timeSlot}</Text>
              </View>

              <View style={styles.detailRow}>
                <Icon name="Map" color={colors.white} />
                <Text>{data.roomName}</Text>
              </View>

              <View style={styles.detailRow}>
                <Icon name="HomeLocation" color={colors.white} />
                <Text>Étage {floor}</Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};
