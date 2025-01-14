import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { CommandSummaryTemplate, SnackBar } from '@components';
import { useTranslation } from 'react-i18next';
import { FormattedReservation, getReservations } from '@services';
import { useNavigation } from '@hooks';
import { styles } from './style';

export const CommandSummaryScreen: React.FC = () => {
  const [reservations, setReservations] = useState<FormattedReservation[] | null>([]);
  const [todaysReservations, setTodaysReservations] = useState<FormattedReservation[]>([]);
  const [pastReservations, setPastReservations] = useState<FormattedReservation[]>([]);

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

  // Fetch initial reservations
  useEffect(() => {
    const fetchReservations = async () => {
      const transformedReservations = await getReservations();
      setReservations(transformedReservations);
    };

    fetchReservations();
  }, []);

  // Group reservations whenever "reservations" state changes
  useEffect(() => {
    const groupReservations = (reservations: FormattedReservation[] | null) => {
      if (!reservations) {
        setTodaysReservations([]);
        setPastReservations([]);
        return;
      }

      const today = new Date();
      const todayReservations: FormattedReservation[] = [];
      const pastReservationsList: FormattedReservation[] = [];

      reservations.forEach((reservation) => {
        const reservationDate = new Date(reservation.day_reservation);
        if (reservationDate.toDateString() === today.toDateString()) {
          todayReservations.push(reservation);
        } else if (reservationDate > today) {
          pastReservationsList.push(reservation);
        }
      });

      setTodaysReservations(todayReservations);
      setPastReservations(pastReservationsList);
    };

    groupReservations(reservations);
  }, [reservations]);

  // Fonction pour annuler la réservation
  const handleCancelReservation = (id: number) => {
    if (reservations) {
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

  console.log("Screen : ", reservations)

  return (
    <View style={styles.container}>
      <SnackBar
        visible={snackbar.open}
        message={snackbar.message}
        onDismiss={() => setSnackbar({ ...snackbar, open: false })}
        severity={snackbar.severity}
      />
      <CommandSummaryTemplate
        headerTitle={t('headers.recapCommands')}
        todaysReservations={todaysReservations}
        pastReservations={pastReservations}
        onCancelReservation={(id) => handleCancelReservation(id)}
        onBackPress={() => navigation.goBack()}
      />
    </View>
  );
};
