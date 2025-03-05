import React from 'react';
import { View, ScrollView, Text } from 'react-native';
import { RestaurantCard } from '@components/molecules';
import { styles } from './style';
import { RestaurantData } from '@services';

type RestaurantSliderProps = {
  restaurantsData: RestaurantData[];
  onPress: ( restaurant: RestaurantData) => void;
  restaurantWords: string[];
};

export const RestaurantSlider: React.FC<RestaurantSliderProps> = ({
  restaurantsData,
  onPress,
  restaurantWords,
}) => {
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
            onPress={() => onPress(restaurant)}
          />
        ))}
      </ScrollView>
    </View>
  );
};
