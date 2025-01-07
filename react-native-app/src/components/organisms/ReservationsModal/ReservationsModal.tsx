import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  Alert,
} from 'react-native';
import { Icon } from '@components/atoms/Icons';
import reservationsData from '@assets/data/reservations.json';
import title_data from '@assets/fr.json';
import { colors } from '@theme';
import { styles } from './style';

// Hook pour gérer les réservations
const useReservationsLogic = () => {
  const [expandedReservationId, setExpandedReservationId] = React.useState<
    number | null
  >(null);

  const toggleExpand = (reservationId: number) => {
    setExpandedReservationId((prevId) =>
      prevId === reservationId ? null : reservationId
    );
  };

  const cancelReservation = (reservationId: number) => {
    Alert.alert(
      'Confirmation',
      'Êtes-vous sûr de vouloir annuler cette réservation ?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Confirmer',
          onPress: () => {
            console.log(`Réservation ${reservationId} annulée.`);
          },
          style: 'destructive',
        },
      ]
    );
  };

  return { expandedReservationId, toggleExpand, cancelReservation };
};

// Hook pour formater les dates et heures
const useFormatLogic = () => {
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':');
    return `${hours}H${minutes}`;
  };

  return { formatDate, formatTime };
};

export type ReservationsModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const ReservationsModal: React.FC<ReservationsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { expandedReservationId, toggleExpand, cancelReservation } =
    useReservationsLogic();
  const { formatDate, formatTime } = useFormatLogic();

  const renderReservation = ({ item }: any) => (
    <TouchableOpacity
      style={[
        styles.reservationCard,
        expandedReservationId === item.reservation_id && styles.expandedCard,
      ]}
      onPress={() => toggleExpand(item.reservation_id)}
    >
      <Text style={styles.room}>{item.location.location_name}</Text>
      <View style={styles.detailsRow}>
        <Icon
          name="Calendar"
          color={colors.resolutionBlue}
          width={20}
          height={20}
        />
        <Text style={styles.detailText}>
          {formatDate(item.day_reservation)}
        </Text>
      </View>
      <View style={styles.detailsRow}>
        <Icon
          name="Clock"
          color={colors.resolutionBlue}
          width={20}
          height={20}
        />
        <Text style={styles.detailText}>
          {formatTime(item.start_time)} - {formatTime(item.end_time)}
        </Text>
      </View>

      {expandedReservationId === item.reservation_id && (
        <View style={styles.expandedContent}>
          <View style={styles.detailsRow}>
            <Icon
              name="Marker"
              color={colors.resolutionBlue}
              width={20}
              height={20}
            />
            <Text style={styles.detailText}>
              {item.establishment.establishment_name}
            </Text>
          </View>
          <View style={styles.detailsRow}>
            <Text style={styles.detailText}>
              {`Étage : ${item.location.floor_name}`}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => cancelReservation(item.reservation_id)}
          >
            <Text style={styles.cancelButtonText}>
              {title_data.buttons.actions.cancelReservation}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <Modal transparent visible={isOpen} animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          {/* Header avec flèche */}
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose}>
              <Icon
                name="BackArrow"
                color={colors.black}
                width={20}
                height={20}
              />
            </TouchableOpacity>
            <Text style={styles.title}>
              {title_data.headers.recapReservation}
            </Text>
          </View>

          {/* Liste des réservations */}
          <FlatList
            data={reservationsData.reservations}
            renderItem={renderReservation}
            keyExtractor={(item) => item.reservation_id.toString()}
          />
        </View>
      </View>
    </Modal>
  );
};
