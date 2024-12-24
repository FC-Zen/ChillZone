import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { styles } from './style';

import { transformRestaurantData } from '@services';
import { ImagesMap } from '@utils';
import { BottomNavbar, RestaurationTemplate, TopBar } from '@components';
import { useTranslation } from 'react-i18next';

export const RestaurationScreen = () => {
  // Type pour les restaurants
  type Restaurant = {
    id: number;
    name: string;
    photo_link: any;
    status: 'Ouvert' | 'Fermé';
  };

  const [restaurantsData1, setRestaurantsData1] = useState<Restaurant[]>([]);
  const [restaurantsData2, setRestaurantsData2] = useState<Restaurant[]>([]);
  const { t } = useTranslation();

  // Chargement des données des restaurants au démarrage
  useEffect(() => {
    const fetchData = async () => {
      const allRestaurants = await transformRestaurantData();

      const firstSet = allRestaurants.filter(
        (restaurant) => restaurant.id === 1 || restaurant.id === 3
      );
      const secondSet = allRestaurants.filter(
        (restaurant) => restaurant.id === 2
      );

      // Transformation des données pour le premier RestaurantSlider
      const transformedFirstSet = firstSet.map((restaurant) => {
        const image = ImagesMap[restaurant.photo_link];
        return {
          id: restaurant.id,
          name: restaurant.name,
          photo_link: image,
          status: restaurant.status,
        };
      });

      // Transformation des données pour le second RestaurantSlider
      const transformedSecondSet = secondSet.map((restaurant) => {
        const image = ImagesMap[restaurant.photo_link];
        return {
          id: restaurant.id,
          name: restaurant.name,
          photo_link: image,
          status: restaurant.status,
        };
      });

      setRestaurantsData1(transformedFirstSet);
      setRestaurantsData2(transformedSecondSet);
    };

    fetchData();
  }, []);

  const handleRestaurantPress = (restaurantName: string) => {
    console.log(`Le restaurant ${restaurantName} a été cliqué.`);
    // navigation.navigate(ROUTE.RESTAURANT_DETAILS, { restaurantName });
  };

  return (
    <View style={styles.container}>
      <TopBar />
      <RestaurationTemplate
        onPressRestaurant={handleRestaurantPress}
        restaurantsData1={restaurantsData1}
        restaurantsData2={restaurantsData2}
        restaurantWords1={[t('categories.restaurants')]}
        restaurantWords2={[t('categories.fridges')]}
        pageHeaderTitle={t('headers.command')}
      />
      <BottomNavbar activeIcon="Lunch" />
    </View>
  );
};
