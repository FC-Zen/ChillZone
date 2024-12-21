import React from 'react';
import { View, Text, Image } from 'react-native';
import { styles } from './style';
import { colors } from '@theme';

type RestaurantCardProps = {
  imageUrl: any;
  status: 'Ouvert' | 'Fermé' | string;
  restaurantName: string;
  distance: string;
  rating: number;
};

export const RestaurantCard: React.FC<RestaurantCardProps> = ({
  imageUrl,
  status,
  restaurantName,
  distance,
  rating,
}) => {
  const isOpen = status === 'Ouvert';

  return (
    <View style={styles.card}>
      <Image source={imageUrl} style={styles.image} />
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
          {status}
        </Text>
      </View>
      <View style={styles.ratingContainer}>
        <View style={styles.ratingCircle}>
          <Text style={styles.ratingText}>{rating.toFixed(1)}</Text>
        </View>
      </View>
      <Text style={styles.restaurantName}>{restaurantName}</Text>
      <Text style={styles.distance}>{distance}</Text>
    </View>
  );
};
