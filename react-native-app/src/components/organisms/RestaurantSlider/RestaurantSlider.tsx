import React from 'react';
import { View, ScrollView, Text } from 'react-native';
import { RestaurantCard } from '@components/molecules';
import { styles } from './style';
import { useTranslation } from 'react-i18next';

type RestaurantSliderProps = {
  restaurantsData: {
    id: number;
    name: string;
    photo_link: any;
    status: 'Ouvert' | 'Fermé';
  }[];
  onPress: (restaurantName: string) => void;
};

export const RestaurantSlider: React.FC<RestaurantSliderProps> = ({
  restaurantsData,
  onPress,
}) => {
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
            photo_link={restaurant.photo_link}
            status={restaurant.status}
            name={restaurant.name}
            onPress={() => onPress(restaurant.name)}
          />
        ))}
      </ScrollView>
    </View>
  );
};
