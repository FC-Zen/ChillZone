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
      console.log('transformedCommand: ', transformedCommand);
    };

    fetchReservations();
  }, []);

  // Group reservations whenever "reservations" state changes
  useEffect(() => {
    const groupReservations = (reservations: FormattedCommand[] | null) => {
      if (!reservations) {
        setTodaysReservations([]);
        setPastReservations([]);
        return;
      }

      console.log('Command reservations: ', reservations);

      setTodaysReservations([]);
      setPastReservations([]);
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
      {/*<CommandSummaryTemplate
        headerTitle={t('headers.recapCommands')}
        todaysReservations={todaysReservations}
        pastReservations={pastReservations}
        onCancelReservation={(id) => handleCancelReservation(id)}
        onBackPress={() => navigation.goBack()}
      />*/}
    </View>
  );
};
