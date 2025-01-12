import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { CommandSummaryTemplate, SnackBar } from '@components';
import { useTranslation } from 'react-i18next';
import { FormattedReservation, getReservations } from '@services';
import { useNavigation } from '@hooks';
import { styles } from './style';

export const CommandSummaryScreen: React.FC = () => {
  const [reservations, setReservations] = useState<FormattedReservation[] | null>([]);

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
      const transformedReservations = await getReservations();
      setReservations(transformedReservations);
    };

    fetchReservations();
  }, []);

  // Fonction pour annuler la réservation
  const handleCancelReservation = (id: number) => {
    if (reservations) {
      // supprime l'index de la réservation
      setReservations(
        reservations.filter((reservation) => reservation?.reservation_id !== id)
      );

      setSnackbar({
        open: true,
        severity: 'success',
        message: 'La réservation a été annulée avec succès',
      });
    }
  };

  const getReservationsGrouped = (reservations: FormattedReservation[] | null) => {
    if (!reservations) {
      return { todaysReservations: [], pastReservations: [] };
    }

    const today = new Date();
    const todaysReservations: FormattedReservation[] = [];
    const pastReservations: FormattedReservation[] = [];

    reservations.forEach((reservation) => {
      const reservationDate = new Date(reservation.day_reservation);
      if (reservationDate.toDateString() === today.toDateString()) {
        todaysReservations.push({ ...reservation });
      } else if (reservationDate > today) {
        pastReservations.push({ ...reservation });
      }
    });
    return { todaysReservations, pastReservations };
  };

  const { todaysReservations, pastReservations } =
    getReservationsGrouped(reservations);

  return (
    <View style={styles.container}>
      <SnackBar
        visible={snackbar.open}
        message={snackbar.message}
        onDismiss={() => setSnackbar({ ...snackbar, open: false })}
        severity={snackbar.severity}
      />
      <CommandSummaryTemplate
        headerTitle={t('headers.recapReservation')}
        todaysReservations={todaysReservations}
        pastReservations={pastReservations}
        onCancelReservation={(id) => handleCancelReservation(id)}
        onBackPress={() => navigation.goBack()}
      />
    </View>
  );
};
