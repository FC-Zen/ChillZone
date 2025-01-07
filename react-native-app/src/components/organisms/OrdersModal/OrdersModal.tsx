import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';
import { Icon, IconProps } from '@components/atoms/Icons';

import ordersData from '@assets/data/commands.json';
import { colors } from '@theme';
import title_data from '@assets/fr.json';
import { styles } from './style';

export type Order = {
  command_id: number;
  total_amount: number;
  command_status: string;
  qrcode_link: string;
  pickup_time: string;
  final_pickup_time: string;
  creation_date: string;
  restauration_place_name: string;
};

type OrdersModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const OrdersModal: React.FC<OrdersModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [expandedCommandId, setExpandedCommandId] = useState<number | null>(
    null
  );

  // Formater les heures au format "HH:MM"
  const formatTime = (time: string) => time.substring(0, 5);

  // Formater la date au format "JJ/MM/AAAA"
  const formatDate = (date: string) => {
    const d = new Date(date);
    return d.toLocaleDateString('fr-FR');
  };

  // Séparer les commandes en "Aujourd'hui" et "Passées"
  const today = new Date().toISOString().split('T')[0];
  const todaysOrders = ordersData.filter(
    (order) => order.creation_date.split('T')[0] === today
  );
  const pastOrders = ordersData.filter(
    (order) => order.creation_date.split('T')[0] !== today
  );

  // Gérer l'expansion ou la réduction d'une commande
  const toggleExpand = (commandId: number) => {
    setExpandedCommandId((prevId) => (prevId === commandId ? null : commandId));
  };

  return (
    <Modal
      visible={isOpen}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          {/* Header avec flèche */}
          <View style={styles.header}>
            <TouchableOpacity>
              <Icon
                name="BackArrow"
                color={colors.black}
                width={20}
                height={20}
                onPress={onClose}
              />
            </TouchableOpacity>
            <Text style={styles.title}>{title_data.headers.recapCommands}</Text>
          </View>

          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            {/* Commandes d'aujourd'hui */}
            {todaysOrders.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                  {title_data.recap.today.commands}
                </Text>
                <FlatList
                  data={todaysOrders}
                  keyExtractor={(item) => item.command_id.toString()}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      onPress={() => toggleExpand(item.command_id)}
                      style={[
                        styles.orderCard,
                        expandedCommandId === item.command_id &&
                          styles.expandedCard,
                      ]}
                    >
                      <Text style={styles.orderText}>N° {item.command_id}</Text>
                      <View style={styles.row}>
                        <Icon
                          name="Calendar"
                          color={colors.resolutionBlue}
                          width={20}
                          height={20}
                        />
                        <Text>{formatDate(item.creation_date)}</Text>
                      </View>
                      <View style={styles.row}>
                        <Icon
                          name="Clock"
                          color={colors.resolutionBlue}
                          width={20}
                          height={20}
                        />
                        <Text>
                          {formatTime(item.pickup_time)} -{' '}
                          {formatTime(item.final_pickup_time)}
                        </Text>
                      </View>

                      {expandedCommandId === item.command_id && (
                        <View style={styles.expandedContent}>
                          <View style={styles.row}>
                            <Icon
                              name="Marker"
                              color={colors.resolutionBlue}
                              width={20}
                              height={20}
                            />
                            <Text>{item.restauration_place_name}</Text>
                          </View>
                          <View style={styles.row}>
                            <Icon
                              name="Money"
                              color={colors.resolutionBlue}
                              width={20}
                              height={20}
                            />
                            <Text>{item.total_amount.toFixed(2)} €</Text>
                          </View>
                          <Text style={styles.detailsText}>
                            QR Code: {item.qrcode_link}
                          </Text>
                        </View>
                      )}
                    </TouchableOpacity>
                  )}
                />
              </View>
            )}

            {/* Commandes passées */}
            {pastOrders.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                  {title_data.recap.previous.commands}
                </Text>
                <FlatList
                  data={pastOrders}
                  keyExtractor={(item) => item.command_id.toString()}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      onPress={() => toggleExpand(item.command_id)}
                      style={[
                        styles.orderCard,
                        expandedCommandId === item.command_id &&
                          styles.expandedCard,
                      ]}
                    >
                      <Text style={styles.orderText}>N° {item.command_id}</Text>
                      <View style={styles.row}>
                        <Icon
                          name="Calendar"
                          color={colors.resolutionBlue}
                          width={20}
                          height={20}
                        />
                        <Text>{formatDate(item.creation_date)}</Text>
                      </View>
                      <View style={styles.row}>
                        <Icon
                          name="Clock"
                          color={colors.resolutionBlue}
                          width={20}
                          height={20}
                        />
                        <Text>
                          {formatTime(item.pickup_time)} -{' '}
                          {formatTime(item.final_pickup_time)}
                        </Text>
                      </View>

                      {expandedCommandId === item.command_id && (
                        <View style={styles.expandedContent}>
                          <View style={styles.row}>
                            <Icon
                              name="Marker"
                              color={colors.resolutionBlue}
                              width={20}
                              height={20}
                            />
                            <Text>{item.restauration_place_name}</Text>
                          </View>
                          <View style={styles.row}>
                            <Icon
                              name="Money"
                              color={colors.resolutionBlue}
                              width={20}
                              height={20}
                            />
                            <Text>{item.total_amount.toFixed(2)} €</Text>
                          </View>
                          <Text style={styles.detailsText}>
                            QR Code: {item.qrcode_link}
                          </Text>
                        </View>
                      )}
                    </TouchableOpacity>
                  )}
                />
              </View>
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};
