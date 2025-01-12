import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { ReservationSummaryTemplate, SnackBar } from '@components';
import { useTranslation } from 'react-i18next';
import { BookingOverlay, transformReservations } from '@services';
import { useNavigation } from '@hooks';
import { styles } from './style';

export const ReservationSummaryScreen: React.FC = () => {
  const [reservations, setReservations] = useState<BookingOverlay[] | null>([]);

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

  useEffect(() => {
    const fetchReservations = async () => {
      const transformedReservations = await transformReservations();
      setReservations(transformedReservations);
    };

    fetchReservations();
  }, []);

  // Fonction pour annuler la réservation
  const handleCancelReservation = (id: number) => {
    if (reservations) {
      // supprime l'index de la réservation
      setReservations(
        reservations.filter((reservation) => reservation?.id !== id)
      );

      setSnackbar({
        open: true,
        severity: 'success',
        message: 'La réservation a été annulée avec succès',
      });
    }
  };

  const getReservationsGrouped = (reservations: BookingOverlay[] | null) => {
    if (!reservations) {
      return { todaysReservations: [], upcomingReservations: [] };
    }

    const today = new Date();
    const todaysReservations: BookingOverlay[] = [];
    const upcomingReservations: BookingOverlay[] = [];

    reservations.forEach((reservation) => {
      const reservationDate = new Date(reservation.data.day_reservation);
      if (reservationDate.toDateString() === today.toDateString()) {
        todaysReservations.push({
          ...reservation,
          title: t('recap.reservationTitle'),
          data: {
            ...reservation.data,
            day_reservation: new Date(
              reservation.data.day_reservation
            ).toLocaleDateString(),
          },
          titleBtn: t('buttons.actions.cancelReservation'),
        });
      } else if (reservationDate > today) {
        upcomingReservations.push({
          ...reservation,
          title: t('recap.reservationTitle'),
          data: {
            ...reservation.data,
            day_reservation: new Date(
              reservation.data.day_reservation
            ).toLocaleDateString(),
          },
          titleBtn: t('buttons.actions.cancelReservation'),
        });
      }
    });
    return { todaysReservations, upcomingReservations };
  };

  const { todaysReservations, upcomingReservations } =
    getReservationsGrouped(reservations);

  return (
    <View style={styles.container}>
      <SnackBar
        visible={snackbar.open}
        message={snackbar.message}
        onDismiss={() => setSnackbar({ ...snackbar, open: false })}
        severity={snackbar.severity}
      />
      <ReservationSummaryTemplate
        headerTitle={t('headers.recapReservation')}
        todaysReservations={todaysReservations}
        upcomingReservations={upcomingReservations}
        onCancelReservation={(id) => handleCancelReservation(id)}
        onBackPress={() => navigation.goBack()}
      />
    </View>
  );
};
