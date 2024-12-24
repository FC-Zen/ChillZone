import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { styles } from './style';

import { transformRestaurantData } from '@services';
import { ImagesMap } from '@utils';
import { BottomNavbar, RestaurationTemplate, TopBar } from '@components';
import { useTranslation } from 'react-i18next';
import { ROUTE } from '@enums';
import { useNavigation } from '@hooks';

export const RestaurationScreen = () => {
  // État pour stocker les données des restaurants
  type Restaurant = {
    id: number;
    name: string;
    photo_link: any;
    status: 'Ouvert' | 'Fermé';
  };

  const [restaurantsData, setRestaurantsData] = useState<Restaurant[]>([]);
  const { t } = useTranslation();
  const navigation = useNavigation();

  // Chargement des données des restaurants au démarrage
  useEffect(() => {
    const fetchData = async () => {
      const restaurants = await transformRestaurantData();

      const transformedRestaurants = restaurants.map((restaurant) => {
        const image = ImagesMap[restaurant.photo_link];
        return {
          id: restaurant.id,
          name: restaurant.name,
          photo_link: image,
          status: restaurant.status,
        };
      });

      setRestaurantsData(transformedRestaurants);
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
        restaurantsData1={restaurantsData}
        restaurantsData2={restaurantsData}
        restaurantWords1={[t('categories.restaurants')]}
        restaurantWords2={[t('categories.crous')]}
        pageHeaderTitle={t('headers.command')}
      />
      <BottomNavbar activeIcon="Lunch" />
    </View>
  );
};
