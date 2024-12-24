import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

export type OrdersModal = {
  command_id: number;
  payment_method: string;
  total_amount: number;
  command_status: string;
  qrcode_link: string;
  pickup_time: string;
  final_pickup_time: string;
  creation_date: string;
  restauration_place_name: string;
};

export type OrdersModalProps = {
  isOpen: boolean;
  onClose: () => void;
  orders: OrdersModal[];
};

const OrdersModal: React.FC<OrdersModalProps> = ({
  isOpen,
  onClose,
  orders,
}) => {
  if (!isOpen) return null;

  // Fonction pour formater la date et l'heure
  const formatTime = (time: string) => time.substring(0, 5); // Récupérer seulement les heures et minutes

  return (
    <View style={styles.overlay}>
      <View style={styles.modal}>
        <Text style={styles.title}>Récapitulatif de mes commandes</Text>
        <FlatList
          data={orders}
          keyExtractor={(item) => item.command_id.toString()}
          renderItem={({ item }) => (
            <View style={styles.orderCard}>
              <Text style={styles.orderText}>
                <Text style={styles.label}>N° : </Text>
                {item.command_id}
              </Text>
              <Text style={styles.orderText}>
                <Text style={styles.label}>Lieu : </Text>
                {item.restauration_place_name}
              </Text>
              <Text style={styles.orderText}>
                <Text style={styles.label}>Heure : </Text>
                {formatTime(item.pickup_time)} -{' '}
                {formatTime(item.final_pickup_time)}
              </Text>
              <Text style={styles.orderText}>
                <Text style={styles.label}>Montant : </Text>
                {item.total_amount} €
              </Text>
            </View>
          )}
        />
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>Fermer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  orderCard: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
  },
  orderText: {
    fontSize: 14,
    marginBottom: 5,
  },
  label: {
    fontWeight: 'bold',
  },
  closeButton: {
    backgroundColor: '#005745',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
