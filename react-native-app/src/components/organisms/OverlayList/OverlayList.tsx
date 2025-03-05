import React from 'react';
import { ScrollView, View } from 'react-native';
import { Overlay } from '@components/molecules/Overlay';
import { IconWithText } from '@components';
import { styles } from './style';
import { colors } from '@theme';
import { useTranslation } from 'react-i18next';
import { ReservationSummary } from '@services/BookingInfoServices';

export type OverlayListProps = {
  todaysReservations: ReservationSummary[];
  upcomingReservations: ReservationSummary[];
  onCancelReservation?: (index: number) => void;
};

export const OverlayList: React.FC<OverlayListProps> = ({
  todaysReservations,
  upcomingReservations,
  onCancelReservation,
}) => {
  const { t } = useTranslation();
  return (
    <ScrollView style={styles.container}>
      {/* Titre pour les réservations d'aujourd'hui */}
      {todaysReservations.length > 0 && (
        <View>
          <IconWithText
            icon="BookMark"
            iconColor={colors.resolutionBlue}
            text={t('recap.today.reservations')}
            textColor={colors.resolutionBlue}
            variant="horizontal"
            style={{ marginBottom: 9 }}
          />

          {/* Liste des réservations d'aujourd'hui */}
          {todaysReservations.map((reservation, index) => (
            <View key={reservation.reservation_id} style={styles.reservationContainer}>
              <Overlay
                data={reservation}
                titleBtn={t('buttons.actions.cancelReservation')}
                cancelReservation={() =>
                  onCancelReservation?.(reservation.reservation_id || index)
                }
              />
            </View>
          ))}
        </View>
      )}

      {/* Titre pour les réservations à venir */}
      {upcomingReservations.length > 0 && (
        <View>
          <IconWithText
            icon="BookMark"
            iconColor={colors.resolutionBlue}
            text={t('recap.previous.reservations')}
            textColor={colors.resolutionBlue}
            variant="horizontal"
            style={{ marginVertical: 9 }}
          />

          {/* Liste des réservations à venir */}
          {upcomingReservations.map((reservation, index) => (
            <View key={index} style={styles.reservationContainer}>
              <Overlay
                data={reservation}
                titleBtn={t('buttons.actions.cancelReservation')}
                cancelReservation={() =>
                  onCancelReservation?.(reservation.reservation_id || index)
                }
              />
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
};
