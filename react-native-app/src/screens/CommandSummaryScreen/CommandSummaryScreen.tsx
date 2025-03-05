import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { CommandSummaryTemplate, SnackBar } from '@components';
import { useTranslation } from 'react-i18next';
import { Command, getAllOrders } from '@services';
import { useNavigation } from '@hooks';
import { styles } from './style';
import { addOneHour, formatDate, formatTime } from '@utils/functions/Command';

export type CommandItemSummary = {
  id: number;
  payment_method: string;
  status: string;
  qrcode_link?: string;
  pickup_time: string;
  final_pickup_time: string;
  creation_date: string;
  restauration_place: string;
  total_price: number;
}

export const CommandSummaryScreen: React.FC = () => {
  const [reservations, setReservations] = useState<Command[] | null>([]);
  const [todaysReservations, setTodaysReservations] = useState<CommandItemSummary[]>([]);
  const [pastReservations, setPastReservations] = useState<CommandItemSummary[]>([]);

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
      const transformedCommand = await getAllOrders();

      setTodaysReservations(transformedCommand.today_orders.map((order: any) => ({
        ...order,
        pickup_time: formatTime(order.pickup_time),
        final_pickup_time: formatTime(addOneHour(order.pickup_time)),
        creation_date: formatDate(order.creation_date)
      })) as CommandItemSummary[]);
  
      setPastReservations(transformedCommand.past_orders.map((order: any) => ({
        ...order,
        pickup_time: formatTime(order.pickup_time),
        final_pickup_time: formatTime(addOneHour(order.pickup_time)),
        creation_date: formatDate(order.creation_date)
      })) as CommandItemSummary[]);
    };
  
    fetchReservations();
  }, []);


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
