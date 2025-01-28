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
  
      // Convert creation_date format
      const months: { [key: string]: string } = {
        janvier: '01',
        février: '02',
        mars: '03',
        avril: '04',
        mai: '05',
        juin: '06',
        juillet: '07',
        août: '08',
        septembre: '09',
        octobre: '10',
        novembre: '11',
        décembre: '12',
      };
  
      const formattedCommands = transformedCommand.map((reservation) => {
        const [day, month, year] = reservation.creation_date.split(' ');
        return {
          ...reservation,
          creation_date: `${day}/${months[month.toLowerCase()]}/${year.slice(-2)}`, // Transform date format
        };
      });
  
      setReservations(formattedCommands);
    };
  
    fetchReservations();
  }, []);
  

  // Group reservations whenever "reservations" state changes
  useEffect(() => {
    // Helper function to check if a date is today
    const isToday = (dateString: string) => {
      const today = new Date();
      const [day, month, year] = dateString.split(' ');
      const months: { [key: string]: number } = {
        janvier: 0,
        février: 1,
        mars: 2,
        avril: 3,
        mai: 4,
        juin: 5,
        juillet: 6,
        août: 7,
        septembre: 8,
        octobre: 9,
        novembre: 10,
        décembre: 11
      };

      const targetDate = new Date(
        parseInt(year, 10),
        months[month],
        parseInt(day, 10)
      );

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
        const finalPickupTime = new Date(
          `${reservation.creation_date} ${reservation.final_pickup_time}`
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

  console.log("Screen : ", reservations)
  console.log("Screen - Today : ", todaysReservations)
  console.log("Screen - Past : ", pastReservations)

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
