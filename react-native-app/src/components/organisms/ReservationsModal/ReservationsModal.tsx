import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  FlatList,
} from 'react-native';
import reservationsData from 'src/assets/data/reservations.json'; // Importation du JSON

export type ReservationsModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const ReservationsModal: React.FC<ReservationsModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  const renderReservation = ({ item }: any) => (
    <View style={styles.reservationCard}>
      <Text style={styles.room}>{item.location.location_name}</Text>
      <View style={styles.detailsRow}>
        <Text style={styles.detailIcon}>📅</Text>
        <Text style={styles.detailText}>
          {formatDate(item.day_reservation)}
        </Text>
      </View>
      <View style={styles.detailsRow}>
        <Text style={styles.detailIcon}>⏰</Text>
        <Text style={styles.detailText}>
          {item.start_time} - {item.end_time}
        </Text>
      </View>
      <Text style={styles.status}>
        Statut:{' '}
        {item.reservation_status === 'Confirmed' ? 'Confirmée' : 'En attente'}
      </Text>
    </View>
  );

  return (
    <Modal transparent visible={isOpen} animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          {/* Titre */}
          <Text style={styles.title}>Récapitulatif de mes réservations</Text>

          {/* Liste des réservations */}
          <FlatList
            data={reservationsData.reservations}
            renderItem={renderReservation}
            keyExtractor={(item) => item.reservation_id.toString()}
          />

          {/* Bouton de fermeture */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Fermer</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    maxHeight: '80%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  reservationCard: {
    backgroundColor: '#F7F7F7',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  room: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  detailIcon: {
    fontSize: 14,
    marginRight: 5,
    color: '#512D6D',
  },
  detailText: {
    fontSize: 14,
    color: '#333',
  },
  status: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  closeButton: {
    alignSelf: 'center',
    marginTop: 20,
    padding: 10,
    backgroundColor: '#512D6D',
    borderRadius: 8,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ReservationsModal;
