import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { TopBar } from '@components/molecules/TopBar';
import { BottomNavbar } from '@components/molecules/BottomNavbar';
import { useUser } from '@contexts/AppContrext';
import { HomeScreenTemplate, HomeScreenTemplateProps } from '@components';
import { useNavigation } from '@react-navigation/native';
import { styles } from './style';
import { transformBookings } from '@services';
import { useTranslation } from 'react-i18next';
import { transformRestaurantData } from '@services';
import { ImagesMap } from '@utils';

export const HomeScreen = () => {
  const navigation = useNavigation();
  const { userName } = useUser();
  const items = transformBookings();
  const { t } = useTranslation();

  // État pour stocker les données des restaurants
  const [restaurantsData, setRestaurantsData] = useState<
    HomeScreenTemplateProps['restaurantsData']
  >([]);

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

  const handleUserPress = () => {
    console.log('on navigue');
    // navigation.navigate();
  };

  const handleFaqPress = () => {
    console.log('on navigue');
    // navigation.navigate();
  };

  const handleNotificationPress = () => {
    console.log('on navigue');
    // navigation.navigate();
  };

  const handleRestaurantPress = (restaurantName: string) => {
    console.log(`Le restaurant ${restaurantName} a été cliqué.`);
    // navigation.navigate(ROUTE.RESTAURANT_DETAILS, { restaurantName });
  };

  return (
    <View style={styles.container}>
      <TopBar
        onUserPress={handleUserPress}
        onFaqPress={handleFaqPress}
        onNotificationPress={handleNotificationPress}
      />
      <HomeScreenTemplate
        username={userName}
        items={items}
        reservationButtonProps={{
          title: t('buttons.actions.cancelReservation'),
          onPress: () => {
            console.log('On annule la réservation');
          },
          iconName: 'Cross',
        }}
        restaurantsData={restaurantsData}
        onPress={handleRestaurantPress}
      />
      <BottomNavbar />
    </View>
  );
};

export default HomeScreen;
