import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { styles } from './style';
import { colors } from '@theme';

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

  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      {' '}
      <Image source={photo_link} style={styles.image} />
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
      <Text style={styles.restaurantName}>{name}</Text>
    </TouchableOpacity>
  );
};
