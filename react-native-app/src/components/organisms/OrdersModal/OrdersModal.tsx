import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';

// Définition du type pour les commandes
export type Order = {
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
  orders: Order[];
};

export const OrdersModal: React.FC<OrdersModalProps> = ({
  isOpen,
  onClose,
  orders,
}) => {
  if (!isOpen) return null;

  // Formater les heures au format "HH:MM"
  const formatTime = (time: string) => time.substring(0, 5);

  // Formater la date au format "JJ/MM/AA"
  const formatDate = (date: string) => {
    const d = new Date(date);
    return d.toLocaleDateString('fr-FR');
  };

  // Séparer les commandes en "Aujourd'hui" et "Passées"
  const today = new Date().toISOString().split('T')[0]; // Date actuelle au format ISO
  const todaysOrders = orders.filter(
    (order) => order.creation_date.split('T')[0] === today
  );
  const pastOrders = orders.filter(
    (order) => order.creation_date.split('T')[0] !== today
  );

  return (
    <Modal
      visible={isOpen}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <Text style={styles.title}>Récapitulatif de mes commandes</Text>

            {/* Commandes d'aujourd'hui */}
            {todaysOrders.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Commandes d'aujourd'hui</Text>
                <FlatList
                  data={todaysOrders}
                  keyExtractor={(item) => item.command_id.toString()}
                  renderItem={({ item }) => (
                    <View style={styles.orderCard}>
                      <Text style={styles.orderText}>N° {item.command_id}</Text>
                      <View style={styles.row}>
                        <Text style={styles.icon}>📅</Text>
                        <Text>{formatDate(item.creation_date)}</Text>
                      </View>
                      <View style={styles.row}>
                        <Text style={styles.icon}>⏰</Text>
                        <Text>
                          {formatTime(item.pickup_time)} -{' '}
                          {formatTime(item.final_pickup_time)}
                        </Text>
                      </View>
                    </View>
                  )}
                />
              </View>
            )}

            {/* Commandes passées */}
            {pastOrders.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Commandes passées</Text>
                <FlatList
                  data={pastOrders}
                  keyExtractor={(item) => item.command_id.toString()}
                  renderItem={({ item }) => (
                    <View style={styles.orderCard}>
                      <Text style={styles.orderText}>N° {item.command_id}</Text>
                      <View style={styles.row}>
                        <Text style={styles.icon}>📅</Text>
                        <Text>{formatDate(item.creation_date)}</Text>
                      </View>
                      <View style={styles.row}>
                        <Text style={styles.icon}>⏰</Text>
                        <Text>
                          {formatTime(item.pickup_time)} -{' '}
                          {formatTime(item.final_pickup_time)}
                        </Text>
                      </View>
                    </View>
                  )}
                />
              </View>
            )}

            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>Fermer</Text>
            </TouchableOpacity>
          </ScrollView>
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
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2E2A85',
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  icon: {
    marginRight: 8,
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
