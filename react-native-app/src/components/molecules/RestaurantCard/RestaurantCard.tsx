import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { styles } from './style';
import { colors } from '@theme';
import { API_URL } from '@env';
import { useTranslation } from 'react-i18next';

type RestaurantCardProps = {
  status: 'Ouvert' | 'Fermé';
  name: string;
  photo_link: any;
  onPress: () => void;
};

export const RestaurantCard: React.FC<RestaurantCardProps> = ({
  name,
  photo_link,
  status,
  onPress,
}) => {
  const isOpen = status === 'Ouvert';
  const { t } = useTranslation();

  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      {' '}
      <Image source={{ uri: `${API_URL}${photo_link}` }} style={styles.image} />
      <View style={styles.statusContainer}>
        <View
          style={[
            styles.statusDot,
            { backgroundColor: isOpen ? colors.aquaDeep : colors.warn },
          ]}
        />
        <Text
          style={[
            styles.statusText,
            {
              color: isOpen ? colors.aquaDeep : colors.warn,
            },
          ]}
        >
          {status === 'Ouvert' ? t('status.open') : t('status.close')}
        </Text>
      </View>
      <Text style={styles.restaurantName}>{name}</Text>
    </TouchableOpacity>
  );
};
