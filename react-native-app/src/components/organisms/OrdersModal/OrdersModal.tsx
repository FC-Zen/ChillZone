import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { Icon } from '@components/atoms/Icons';
import { OrderCard } from '@components/molecules/OrderCard'; // Le composant enfant
import ordersData from '@assets/data/commands.json';
import { colors } from '@theme';
import { styles } from './style';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

  // Gérer les IDs des commandes étendues
  const [expandedCommandId, setExpandedCommandId] = useState<number | null>(
    null
  );

  const toggleExpand = (commandId: number) => {
    setExpandedCommandId((prevId) => (prevId === commandId ? null : commandId));
  };

  // Séparer les commandes en "aujourd'hui" et "passées"
  const today = new Date().toISOString().split('T')[0];
  const todaysOrders = ordersData.filter(
    (order) => order.creation_date.split('T')[0] === today
  );
  const pastOrders = ordersData.filter(
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
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose}>
              <Icon
                name="BackArrow"
                color={colors.black}
                width={20}
                height={20}
              />
            </TouchableOpacity>
            <Text style={styles.title}>{t('headers.recapCommands')}</Text>
          </View>

          {/* Main Content */}
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            {/* Commandes d'aujourd'hui */}
            {todaysOrders.length > 0 && (
                <View style={styles.section}>
                {/* Ajout d'une vue contenant l'icône et le texte */}
                <View style={styles.sectionHeader}>
                  <Icon name="Hamburger" color={colors.resolutionBlue} width={20} height={20} />
                  <Text style={styles.sectionTitle}>
                  {t('recap.today.commands')}
                  </Text>
                </View>
                {todaysOrders.map((order) => (
                  <OrderCard
                    key={order.command_id}
                    order={order}
                    isExpanded={expandedCommandId === order.command_id}
                    onToggleExpand={() => toggleExpand(order.command_id)}
                  />
                ))}
              </View>
            )}

            {/* Commandes passées */}
            {pastOrders.length > 0 && (
              <View style={styles.section}>
                {/* Ajout d'une vue contenant l'icône et le texte */}
                <View style={styles.sectionHeader}>
                  <Icon name="Hamburger" color={colors.resolutionBlue} width={20} height={20} />
                  <Text style={styles.sectionTitle}>
                    {t('recap.previous.commands')}
                  </Text>
                </View>
                {pastOrders.map((order) => (
                  <OrderCard
                    key={order.command_id}
                    order={order}
                    isExpanded={expandedCommandId === order.command_id}
                    onToggleExpand={() => toggleExpand(order.command_id)}
                  />
                ))}
              </View>
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};
