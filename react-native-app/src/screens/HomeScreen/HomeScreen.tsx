import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { TopBar } from '@components/molecules/TopBar';
import { BottomNavbar, SnackBar } from '@components/molecules';
import { useNextBooking, UserContext } from '@contexts';
import { HomeScreenTemplate, HomeScreenTemplateProps } from '@components';
import { styles } from './style';
import { transformBookings, fetchRestaurantData } from '@services';
import { useTranslation } from 'react-i18next';
import { ImagesMap } from '@utils';
import { useNavigation } from '@hooks';
import { ROUTE } from '@enums';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const HomeScreen: React.FC = () => {
  const userContext = UserContext.getInstance();
  const userName = userContext.getUsername();
  let items = [transformBookings()];
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { nextBooking, updateNextBooking } = useNextBooking();

  if (nextBooking) {
    items = nextBooking;
  }

  // Récupère la réservation à venir, la plus proche de la date actuelle
  const getNextBooking = () => {
    return items[0];
  };

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

  // Annuler une réservation
  const handleCancelReservation = () => {
    updateNextBooking([]);
    setSnackbar({
      open: true,
      severity: 'success',
      message: 'La réservation a été annulée avec succès',
    });
  };

  // Chargement des données des restaurants au démarrage
  useEffect(() => {
    const fetchData = async () => {
      try {
        const restaurants = await fetchRestaurantData();

        const transformedRestaurants = restaurants.map((restaurant) => ({
          id: restaurant.id,
          name: restaurant.name,
          photo_link: ImagesMap[restaurant.photo_link] || restaurant.photo_link, // Gestion des images
          status: restaurant.status,
        }));

        setRestaurantsData(transformedRestaurants);
      } catch (error) {
        console.error('Erreur lors du chargement des restaurants:', error);
        setSnackbar({
          open: true,
          severity: 'error',
          message: 'Impossible de charger les restaurants',
        });
      }
    };

    fetchData();
  }, []);

  const handleRestaurantPress = (selectedRestaurant: {
    id: number;
    name: string;
    photo_link: any;
    status: 'Ouvert' | 'Fermé';
  }) => {
    if (selectedRestaurant.status == 'Ouvert') {
      navigation.navigate(ROUTE.DISPENSER);
    } else {
      setSnackbar({
        open: true,
        severity: 'error',
        message: 'Le restaurant est fermé en ce moment',
      });
      navigation.navigate(ROUTE.DISPENSER);
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
        items={getNextBooking()}
        reservationButtonProps={{
          title: t('buttons.actions.cancelReservation'),
          onPress: handleCancelReservation,
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
