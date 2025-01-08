import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Icon } from '@components/atoms/Icons';
import { colors } from '@theme';
import { styles } from './style';
import { ImagesMap } from '@utils';

type OrderCardProps = {
  order: {
    command_id: number;
    total_amount: number;
    qrcode_link: string;
    pickup_time: string;
    final_pickup_time: string;
    creation_date: string;
    restauration_place_name: string;
  };
  isExpanded: boolean;
  onToggleExpand: () => void;
};

export const OrderCard: React.FC<OrderCardProps> = ({
  order,
  isExpanded,
  onToggleExpand,
}) => {
  const image = ImagesMap['qrcode.png'];
  const formatTime = (time: string) => time.substring(0, 5);
  const formatDate = (date: string) => {
    const d = new Date(date);
    return d.toLocaleDateString('fr-FR');
  };

  return (
    <TouchableOpacity
      style={[styles.card, isExpanded && styles.expandedCard]}
      onPress={onToggleExpand}
    >
      {isExpanded && (
        <Text style={styles.expandedTitle}>Commande</Text> //Il n'ya pas la clé json pour mettre "Commande"
      )}
      <Text
        style={[
          styles.cardTitle,
          isExpanded && styles.centeredCardTitle, // Style supplémentaire si étendu
        ]}
      >
        N° {order.command_id}
      </Text>
      {/* QR Code, il faudra changer le chemin sorce par source={{ uri: order.qrcode_link }}*/}
      {isExpanded && (
        <View style={styles.qrCodeContainer}>
          <Image source={image} style={styles.qrCodeImage} />
        </View>
      )}
      <View style={styles.cardContentLeft}>
        <View style={styles.row}>
          <Icon
            name="Calendar"
            color={colors.resolutionBlue}
            width={16}
            height={16}
          />
          <Text style={styles.detailText}>
            {formatDate(order.creation_date)}
          </Text>
        </View>
        <View style={styles.row}>
          <Icon
            name="Clock"
            color={colors.resolutionBlue}
            width={16}
            height={16}
          />
          <Text style={styles.detailText}>
            {formatTime(order.pickup_time)} -{' '}
            {formatTime(order.final_pickup_time)}
          </Text>
        </View>
      </View>

      {isExpanded && (
        <View style={styles.expandedContent}>
          <View style={styles.row}>
            <Icon
              name="Marker"
              color={colors.resolutionBlue}
              width={16}
              height={16}
            />
            <Text style={styles.detailText}>
              {order.restauration_place_name}
            </Text>
          </View>
          <View style={styles.row}>
            <Icon
              name="Money"
              color={colors.resolutionBlue}
              width={16}
              height={16}
            />
            <Text style={styles.detailText}>
              {order.total_amount.toFixed(2)} €
            </Text>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
};
