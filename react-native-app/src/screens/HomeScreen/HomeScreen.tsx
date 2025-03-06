import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { TopBar } from '@components/molecules/TopBar';
import { BottomNavbar, SnackBar } from '@components/molecules';
import { useNextBooking, UserContext } from '@contexts';
import { HomeScreenTemplate, HomeScreenTemplateProps } from '@components';
import { styles } from './style';
import {
  cancelReservation,
  ReservationSummary,
  RestaurantData,
  transformBookings,
  transformRestaurantData,
} from '@services';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@hooks';
import { ROUTE } from '@enums';
import { getMyReservations } from '@services';
import { getLastReservation } from '@utils/functions';

export const HomeScreen: React.FC = () => {
  const userContext = UserContext.getInstance();
  const userName = userContext.getUsername();
  let items = transformBookings();
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { nextBooking, setNextBooking } = useNextBooking();
  const [actualReservation, setActualReservation] =
    useState<ReservationSummary | null>(null);

  if (nextBooking) {
    items = nextBooking;
  }

  useEffect(() => {
    const fetchReservations = async () => {
      const reservations = await getMyReservations();
      const nextReservation = getLastReservation(reservations);
      setActualReservation(nextReservation);
      const formattedStartTime = nextReservation?.start_time.split(':');
      const formattedEndTime = nextReservation?.end_time.split(':');
      let formattedTimeSlot = '';
      if (formattedStartTime && formattedEndTime) {
        formattedTimeSlot =
          formattedStartTime[0] +
          'h' +
          formattedStartTime[1] +
          ' - ' +
          formattedEndTime[0] +
          'h' +
          formattedEndTime[1];
      }
      setNextBooking([
        {
          label: nextReservation?.location_name || '',
          icon: 'Cube',
          typeLabel: 'Salle',
        },
        {
          label: nextReservation?.day_reservation || '',
          icon: 'Calendar',
          typeLabel: 'Date',
        },
        {
          label: nextReservation?.floor_name || '',
          icon: 'Marker',
          typeLabel: 'Étage',
        },
        {
          label: formattedTimeSlot.length > 0 ? formattedTimeSlot : '',
          icon: 'Clock',
          typeLabel: 'Heure',
        },
      ]);
    };

    fetchReservations();
  }, []);

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

  const handleCancelReservation = async (
    reservationId: ReservationSummary['reservation_id']
  ) => {
    try {
      const response = await cancelReservation(reservationId);

      if (response?.success) {
        setSnackbar({
          open: true,
          severity: 'success',
          message: response.message || 'Réservation annulée avec succès.',
        });

        const reservations = await getMyReservations();
        const nextReservation = getLastReservation(reservations);

        // Mettre à jour l'état global
        setActualReservation(nextReservation);
        const formattedStartTime = nextReservation?.start_time.split(':');
        const formattedEndTime = nextReservation?.end_time.split(':');
        let formattedTimeSlot = '';
        if (formattedStartTime && formattedEndTime) {
          formattedTimeSlot =
            formattedStartTime[0] +
            'h' +
            formattedStartTime[1] +
            ' - ' +
            formattedEndTime[0] +
            'h' +
            formattedEndTime[1];
        }
        setNextBooking(
          nextReservation
            ? [
                {
                  label: nextReservation.location_name || '',
                  icon: 'Cube',
                  typeLabel: 'Salle',
                },
                {
                  label: nextReservation.day_reservation || '',
                  icon: 'Calendar',
                  typeLabel: 'Date',
                },
                {
                  label: nextReservation.floor_name || '',
                  icon: 'Marker',
                  typeLabel: 'Étage',
                },
                {
                  label: formattedTimeSlot.length > 0 ? formattedTimeSlot : '',
                  icon: 'Clock',
                  typeLabel: 'Heure',
                },
              ]
            : []
        );
      } else {
        console.error("Erreur d'annulation API:", response);
        setSnackbar({
          open: true,
          severity: 'error',
          message:
            response?.message || "Échec de l'annulation de la réservation.",
        });
      }
    } catch (error) {
      console.error("Erreur lors de l'annulation de la réservation:", error);
      setSnackbar({
        open: true,
        severity: 'error',
        message:
          "Une erreur est survenue lors de l'annulation de la réservation.",
      });
    }
  };

  // Chargement des données des restaurants au démarrage
  useEffect(() => {
    const fetchData = async () => {
      try {
        const restaurants = await transformRestaurantData();

        const transformedRestaurants = restaurants.map((restaurant) => ({
          id: restaurant.id,
          name: restaurant.name,
          photo_link: restaurant.photo_link,
          opening_time: restaurant.opening_time,
          closing_time: restaurant.closing_time,
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

  const handleRestaurantPress = (selectedRestaurant: RestaurantData) => {
    if (selectedRestaurant.status === 'Ouvert') {
      navigation.navigate(ROUTE.DISPENSER, {
        restaurant: selectedRestaurant,
      });
    } else {
      setSnackbar({
        open: true,
        severity: 'error',
        message: 'Le restaurant est fermé en ce moment',
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
        items={nextBooking || []}
        roomPhotoLink={actualReservation?.photo_link || ''}
        reservationButtonProps={{
          title: t('buttons.actions.cancelReservation'),
          onPress: () =>
            handleCancelReservation(actualReservation?.reservation_id || 0),
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
