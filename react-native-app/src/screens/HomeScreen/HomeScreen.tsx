import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { TopBar } from '@components/molecules/TopBar';
import { BottomNavbar, SnackBar } from '@components/molecules';
import { useUser } from '@contexts/AppContrext';
import { HomeScreenTemplate, HomeScreenTemplateProps } from '@components';
import { styles } from './style';
import { transformBookings } from '@services';
import { useTranslation } from 'react-i18next';
import { transformRestaurantData } from '@services';
import { ImagesMap } from '@utils';
import { useNavigation } from '@hooks';
import { ROUTE } from '@enums';

export const HomeScreen = () => {
  const { userName } = useUser();
  const items = transformBookings();
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

  const restaurantText = t('info.restaurants');
  const restaurantWords = restaurantText.split(' ');

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
      <HomeScreenTemplate
        welcomeMessage={restaurantWords}
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
      <BottomNavbar activeIcon="Home" />
    </View>
  );
};

export default HomeScreen;
