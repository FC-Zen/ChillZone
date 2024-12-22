import React from 'react';
import { View, ScrollView, Text } from 'react-native';
import { RestaurantCard } from '@components/molecules';
import { styles } from './style';
import { restaurant } from '@assets/Images';
import { useTranslation } from 'react-i18next';

const restaurantsData = [
  {
    imageUrl: restaurant,
    status: 'Ouvert',
    restaurantName: "Au p'tit creux",
    distance: 'à 200m',
    rating: 4.0,
  },
  {
    imageUrl: restaurant,
    status: 'Ouvert',
    restaurantName: 'Le Gourmet',
    distance: 'à 300m',
    rating: 4.5,
  },
  {
    imageUrl: restaurant,
    status: 'Fermé',
    restaurantName: 'Pizza Time',
    distance: 'à 150m',
    rating: 3.8,
  },
  {
    imageUrl: restaurant,
    status: 'Ouvert',
    restaurantName: 'Sushi Place',
    distance: 'à 250m',
    rating: 4.2,
  },
];

export const RestaurantSlider = () => {
  const { t } = useTranslation();
  const restaurantText = t('info.restaurants');
  const restaurantWords = restaurantText.split(' ');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        <Text style={styles.highlightedText}>{restaurantWords[0]} </Text>
        {restaurantWords.slice(1).join(' ')}
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {restaurantsData.map((restaurant, index) => (
          <RestaurantCard
            key={index}
            imageUrl={restaurant.imageUrl}
            status={restaurant.status}
            restaurantName={restaurant.restaurantName}
            distance={restaurant.distance}
            rating={restaurant.rating}
          />
        ))}
      </ScrollView>
    </View>
  );
};
