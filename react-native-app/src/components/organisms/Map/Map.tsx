import React from 'react';
import { View, Text } from 'react-native';
import { BookingInfo, ReservationButton } from '@components/molecules';
import { styles } from './style';
import { useTranslation } from 'react-i18next';

export const Map = () => {
  const { t } = useTranslation();
  const reservationText = t('info.reservation');
  const reservationWords = reservationText.split(' ');

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>
        <Text style={styles.highlightedText}>{reservationWords[0]} </Text>
        {reservationWords.slice(1).join(' ')}
      </Text>
      <View>
        <BookingInfo />
      </View>
      <ReservationButton
        title={t('buttons.actions.cancelReservation')}
        onPress={() => {}}
        iconName="Cross"
      />
    </View>
  );
};
