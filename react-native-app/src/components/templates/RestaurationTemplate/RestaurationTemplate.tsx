import React from 'react';
import { ScrollView, View } from 'react-native';
import { RestaurantSlider } from '@components';
import { PageHeader } from '@components/molecules/PageHeader';
import { RestaurantData as Restaurant } from '@services';

type RestaurationTemplateProps = {
  pageHeaderTitle: string;
  restaurantsData1: Restaurant[];
  restaurantsData2: Restaurant[];
  restaurantWords1: string[];
  restaurantWords2: string[];
  onPressRestaurant: ( restaurant : Restaurant) => void;
};

export const RestaurationTemplate: React.FC<RestaurationTemplateProps> = ({
  pageHeaderTitle,
  restaurantsData1,
  restaurantsData2,
  restaurantWords1,
  restaurantWords2,
  onPressRestaurant,
}) => {
  return (
    <ScrollView>
      <View>
        {/* PageHeader Component */}
        <PageHeader title={pageHeaderTitle} variant="default" />

        {/* First RestaurantSlider */}
        <RestaurantSlider
          onPress={onPressRestaurant}
          restaurantsData={restaurantsData1}
          restaurantWords={restaurantWords1}
        />

        {/* Second RestaurantSlider */}
        <RestaurantSlider
          onPress={onPressRestaurant}
          restaurantsData={restaurantsData2}
          restaurantWords={restaurantWords2}
        />
      </View>
    </ScrollView>
  );
};
