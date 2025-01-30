import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { CommandSummaryTemplate, SnackBar } from '@components';
import { useTranslation } from 'react-i18next';
import { FormattedCommand, getCommands } from '@services';
import { useNavigation } from '@hooks';
import { styles } from './style';

export const CommandSummaryScreen: React.FC = () => {
  const [reservations, setReservations] = useState<FormattedCommand[] | null>([]);
  const [todaysReservations, setTodaysReservations] = useState<FormattedCommand[]>([]);
  const [pastReservations, setPastReservations] = useState<FormattedCommand[]>([]);

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
      const transformedCommand = await getCommands();
      setReservations(transformedCommand);
    };
  
    fetchReservations();
  }, []);
  

  useEffect(() => {
    // Vérifie si une date est aujourd'hui
    const isToday = (dateString: string) => {
      const today = new Date();
      const [day, month, year] = dateString.split('/').map(Number);
      const targetDate = new Date(year, month - 1, day); // Mois commence à 0 dans JS
  
      return (
        today.getFullYear() === targetDate.getFullYear() &&
        today.getMonth() === targetDate.getMonth() &&
        today.getDate() === targetDate.getDate()
      );
    };
  
    const groupReservations = (reservations: FormattedCommand[] | null): void => {
      if (!reservations) {
        setTodaysReservations([]);
        setPastReservations([]);
        return;
      }
  
      const now = new Date();
      const todaysReservations: FormattedCommand[] = [];
      const pastReservations: FormattedCommand[] = [];
  
      reservations.forEach((reservation) => {
        const [day, month, year] = reservation.creation_date.split('/').map(Number);
        const reservationDate = new Date(year, month - 1, day); // Conversion en Date
  
        const finalPickupTime = new Date(
          `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}T${reservation.final_pickup_time}`
        );
  
        if (isToday(reservation.creation_date)) {
          if (finalPickupTime < now) {
            pastReservations.push(reservation);
          } else {
            todaysReservations.push(reservation);
          }
        } else {
          pastReservations.push(reservation);
        }
      });
  
      setTodaysReservations(todaysReservations);
      setPastReservations(pastReservations);
    };
  
    groupReservations(reservations);
  }, [reservations]);

  // Fonction pour annuler la réservation
  const handleCancelReservation = (id: number) => {
    if (reservations) {
      setReservations(
        reservations.filter((reservation) => reservation?.command_id !== id)
      );

      setSnackbar({
        open: true,
        severity: 'success',
        message: 'La réservation a été annulée avec succès',
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
      {<CommandSummaryTemplate
        headerTitle={t('headers.recapCommands')}
        todaysReservations={todaysReservations}
        pastReservations={pastReservations}
        onCancelReservation={(id) => handleCancelReservation(id)}
        onBackPress={() => navigation.goBack()}
      />}
    </View>
  );
};
