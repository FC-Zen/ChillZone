import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import { Overlay } from '@components/molecules/Overlay';
import { IconWithText } from '@components';
import { styles } from './style';
import { colors } from '@theme';
import { useTranslation } from 'react-i18next';
import { FormattedReservation } from '@services';
import { CommandOverlay } from '@components/molecules';

export type OverlayCommandListProps = {
  todaysReservations: FormattedReservation[];
  pastReservations: FormattedReservation[];
  onCancelReservation?: (index: number) => void;
};

export const OverlayCommandList: React.FC<OverlayCommandListProps> = ({
  todaysReservations,
  pastReservations,
  onCancelReservation,
}) => {
  const { t } = useTranslation();
  console.log(pastReservations);
  return (
    <ScrollView style={styles.container}>
      {/* Titre pour les réservations d'aujourd'hui */}
      {todaysReservations.length > 0 && (
        <View>
          <IconWithText
            icon="BookMark"
            iconColor={colors.resolutionBlue}
            text={t('recap.today.commands')}
            textColor={colors.resolutionBlue}
            variant="horizontal"
            style={{ marginBottom: 9 }}
          />

          {/* Liste des réservations d'aujourd'hui */}
          {todaysReservations.map((reservation, index) => (
            <View key={reservation.reservation_id} style={styles.reservationContainer}>
              <CommandOverlay
                data={reservation}
              />
            </View>
          ))}
        </View>
      )}

      {/* Titre pour les réservations à venir */}
      {pastReservations.length > 0 && (
        <View>
          <IconWithText
            icon="BookMark"
            iconColor={colors.resolutionBlue}
            text={t('recap.previous.commands')}
            textColor={colors.resolutionBlue}
            variant="horizontal"
            style={{ marginVertical: 9 }}
          />

          {/* Liste des réservations à venir */}
          {pastReservations.map((reservation, index) => (
            <View key={index} style={styles.reservationContainer}>
              <CommandOverlay
                data={reservation}
              />
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
};
