import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { ReservationSummaryTemplate, SnackBar } from '@components';
import { useTranslation } from 'react-i18next';
import { BookingOverlay, transformReservations } from '@services';
import { useNavigation } from '@hooks';
import { styles } from './style';
import { cancelReservation, getMyReservations, ReservationSummary } from '@services/BookingInfoServices';
import { formatTime } from '@utils/functions/Command';

export const ReservationSummaryScreen: React.FC = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const [todayReservations, setTodayReservations] = useState<any[]>([]);
  const [upcomingReservations, setUpcomingReservations] = useState<any[]>([]);

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
      try {
        const response = await getMyReservations();
        const { today_reservations, upcoming_reservations } = response.data;
  
        const filteredTodayReservations = today_reservations.filter(
          (order: any) => order.reservation_status !== 'Cancelled'
        );
  
        const filteredUpcomingReservations = upcoming_reservations.filter(
          (order: any) => order.reservation_status !== 'Cancelled'
        );
  
        setTodayReservations(
          filteredTodayReservations.map((order: any) => ({
            ...order,
            start_time: formatTime(order.start_time),
            end_time: formatTime(order.end_time),
          })) as ReservationSummary[]
        );
  
        setUpcomingReservations(
          filteredUpcomingReservations.map((order: any) => ({
            ...order,
            start_time: formatTime(order.start_time),
            end_time: formatTime(order.end_time),
          })) as ReservationSummary[]
        );
      } catch (error) {
        console.error('Erreur de récupération des réservations', error);
      }
    };
  
    fetchReservations();
  }, []);
  
  

  const handleCancelReservation = async (reservationId: number) => {
    try {
      const response = await cancelReservation(reservationId);
      if (response?.success) {
        setSnackbar({
          open: true,
          severity: 'success',
          message: response.message || 'Réservation annulée avec succès.',
        });
      } else {
        setSnackbar({
          open: true,
          severity: 'error',
          message: response?.message || 'Échec de l\'annulation de la réservation.',
        });
      }
    } catch (error) {
      console.error('Erreur lors de l\'annulation de la réservation:', error);
      setSnackbar({
        open: true,
        severity: 'error',
        message: 'Une erreur est survenue lors de l\'annulation de la réservation.',
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
      <ReservationSummaryTemplate
        headerTitle={t('headers.recapReservation')}
        todaysReservations={todayReservations}
        upcomingReservations={upcomingReservations}
        onCancelReservation={(id) => handleCancelReservation(id)}
        onBackPress={() => navigation.goBack()}
      />
    </View>
  );
};
