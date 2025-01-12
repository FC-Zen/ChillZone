import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { ReservationSummaryTemplate } from '@components';
import { useTranslation } from 'react-i18next';
import { BookingOverlay, transformReservations } from '@services';
import { useNavigation } from '@hooks';
import { styles } from './style';

export const ReservationSummaryScreen: React.FC = () => {
  const [reservations, setReservations] = useState<BookingOverlay[]>([]);

  const { t } = useTranslation();
  const navigation = useNavigation();

  useEffect(() => {
    const fetchReservations = async () => {
      const transformedReservations = await transformReservations();
      setReservations(transformedReservations);
    };

    fetchReservations();
  }, []);

  // Fonction pour annuler la réservation
  const handleCancelReservation = (index: number) => {
    console.log('Réservation annulée', index);
  };

  const getReservationsGrouped = (reservations: BookingOverlay[]) => {
    const today = new Date();
    const todaysReservations: BookingOverlay[] = [];
    const upcomingReservations: BookingOverlay[] = [];

    reservations.forEach((reservation) => {
      const reservationDate = new Date(reservation.data.day_reservation);
      console.log('🚀 ~ reservationDate:', reservationDate);
      console.log('🚀 ~ today:', today);
      if (reservationDate.toDateString() === today.toDateString()) {
        console.log('Entrée dans le if');
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
      <ReservationSummaryTemplate
        headerTitle={t('headers.recapReservation')}
        todaysReservations={todaysReservations}
        upcomingReservations={upcomingReservations}
        onCancelReservation={handleCancelReservation}
        onBackPress={() => navigation.goBack()}
      />
    </View>
  );
};
