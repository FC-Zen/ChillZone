import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { styles } from './style';

import { transformRestaurantData } from '@services';
import { ImagesMap } from '@utils';
import { BottomNavbar, RestaurationTemplate, SnackBar, TopBar } from '@components';
import { useTranslation } from 'react-i18next';
import { ROUTE } from '@enums';
import { useNavigation } from '@hooks';

export const RestaurationScreen = () => {
  type Restaurant = {
    id: number;
    name: string;
    photo_link: any;
    status: 'Ouvert' | 'Fermé';
  };

  const [restaurantsData1, setRestaurantsData1] = useState<Restaurant[]>([]);
  const [restaurantsData2, setRestaurantsData2] = useState<Restaurant[]>([]);
  const { t } = useTranslation();
  const navigation = useNavigation();

  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    severity: 'success' | 'error';
    message: string;
  }>({
    open: false,
    severity: 'success',
    message: '',
  });

  const fetchFirstSet = async () => {
    const allRestaurants = await transformRestaurantData();

    const firstSet = allRestaurants.filter(
      (restaurant) => restaurant.id === 1 || restaurant.id === 3
    );

    const transformedFirstSet = firstSet.map((restaurant) => {
      const image = ImagesMap[restaurant.photo_link];
      return {
        id: restaurant.id,
        name: restaurant.name,
        photo_link: image,
        status: restaurant.status,
      };
    });

    setRestaurantsData1(transformedFirstSet);
  };

  const fetchSecondSet = async () => {
    const allRestaurants = await transformRestaurantData();

    const secondSet = allRestaurants.filter(
      (restaurant) => restaurant.id === 2
    );

    const transformedSecondSet = secondSet.map((restaurant) => {
      const image = ImagesMap[restaurant.photo_link];
      return {
        id: restaurant.id,
        name: restaurant.name,
        photo_link: image,
        status: restaurant.status,
      };
    });

    setRestaurantsData2(transformedSecondSet);
  };

  useEffect(() => {
    fetchFirstSet();
    fetchSecondSet();
  }, []);

  const handleRestaurantPress = (selectedRestaurant: {
    id: number;
    name: string;
    photo_link: any;
    status: 'Ouvert' | 'Fermé';
  }) => {
    console.log(`Le restaurant a été cliqué.`,selectedRestaurant.name);
    if (selectedRestaurant.status == 'Ouvert') {
      navigation.navigate(ROUTE.DISPENSER);
    } else {
      setSnackbar({
        open: true,
        severity: "error",
        message: "Le restaurant est fermé en ce moment",
      });
    }
  };

  return (
    
    <View style={styles.container}>
      <SnackBar
        visible={snackbar.open}
        message={snackbar.message}
        onDismiss={() => setSnackbar({ ...snackbar, open: false })}
        severity={snackbar.severity}
      />
            
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
