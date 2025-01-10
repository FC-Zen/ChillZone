import React from 'react';
import { ScrollView, View } from 'react-native';
import { Overlay } from '@components/molecules/Overlay';
import { styles } from './style';

export type ReservationItemProps = {
  title: string;
  salle: string;
  date: string;
  horaire: string;
  location: string;
  etage: string;
  titleBtn: string;
  cancelReservation?: () => void;
};

export type OverlayListProps = {
  reservations: ReservationItemProps[];
  onCancelReservation?: (index: number) => void;
};

export const OverlayList: React.FC<OverlayListProps> = ({
  reservations,
  onCancelReservation,
}) => {
  return (
    <ScrollView style={styles.container}>
      {reservations.map((reservation, index) => (
        <View key={index} style={styles.reservationContainer}>
          <Overlay
            title={reservation.title}
            salle={reservation.salle}
            date={reservation.date}
            horaire={reservation.horaire}
            location={reservation.location}
            etage={reservation.etage}
            titleBtn={reservation.titleBtn}
            cancelReservation={() => onCancelReservation?.(index)}
          />
        </View>
      ))}
    </ScrollView>
  );
};
