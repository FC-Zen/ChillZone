import React from 'react';
import { View, ScrollView } from 'react-native';
import { styles } from './style';
import { OverlayList, PageHeader } from '@components';

const fakeReservations = [
  {
    title: 'Réunion de projet',
    salle: 'Salle A',
    date: '2025-01-15',
    horaire: '14:00 - 15:00',
    location: 'Bâtiment 1',
    etage: '2ème étage',
    titleBtn: 'Annuler',
  },
  {
    title: 'Entretien avec le client',
    salle: 'Salle B',
    date: '2025-01-16',
    horaire: '10:00 - 11:00',
    location: 'Bâtiment 2',
    etage: '3ème étage',
    titleBtn: 'Annuler',
  },
  {
    title: 'Formation interne',
    salle: 'Salle C',
    date: '2025-01-18',
    horaire: '09:00 - 12:00',
    location: 'Bâtiment 3',
    etage: '1er étage',
    titleBtn: 'Annuler',
  },
];

export const ReservationSummaryScreen: React.FC = () => {
  const handleCancelReservation = (index: number) => {
    console.log("Réservation annulée à l'index", index);
  };

  return (
    <View style={styles.container}>
      <PageHeader title="Récapitulatif de mes réservations" variant="back" />

      <ScrollView style={styles.content}>
        <OverlayList
          reservations={fakeReservations}
          onCancelReservation={handleCancelReservation}
        />
      </ScrollView>
    </View>
  );
};
