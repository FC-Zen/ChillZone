import React from 'react';
import { View, Text } from 'react-native';
import { BookingInfo } from '@components/molecules/BookingInfo';
import { ReservationButton } from '@components/molecules/ReservationButton';
import { styles } from './style';

export const Map = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>
        Retrouvez votre prochaine réservation
      </Text>
      <View style={styles.bookingInfoContainer}>
        <BookingInfo />
      </View>
      <ReservationButton
        title="Annuler la réservation"
        onPress={() => {}}
        iconName="Cross"
      />
    </View>
  );
};
