import React from 'react';
import { View } from 'react-native';
import { styles } from './style';
import { ReservationSummaryTemplate, ReservationItemProps } from '@components';
import { useTranslation } from 'react-i18next';
import { t } from 'i18next';

const fakeReservations: ReservationItemProps[] = [
  {
    title: 'Réunion de projet',
    salle: 'Salle A',
    date: new Date().toISOString().split('T')[0],
    horaire: '14:00 - 15:00',
    location: 'Bâtiment 1',
    etage: '2ème',
    titleBtn: 'Annuler',
  },
  {
    title: 'Entretien avec le client',
    salle: 'Salle B',
    date: new Date(new Date().setDate(new Date().getDate() + 3))
      .toISOString()
      .split('T')[0],
    horaire: '10:00 - 11:00',
    location: 'Bâtiment 2',
    etage: '3ème',
    titleBtn: 'Annuler',
  },
  {
    title: 'Formation interne',
    salle: 'Salle C',
    date: new Date(new Date().setDate(new Date().getDate() + 5))
      .toISOString()
      .split('T')[0],
    horaire: '09:00 - 12:00',
    location: 'Bâtiment 3',
    etage: '1er',
    titleBtn: 'Annuler',
  },
  {
    title: 'Réunion passée',
    salle: 'Salle D',
    date: new Date(new Date().setDate(new Date().getDate() + 0))
      .toISOString()
      .split('T')[0],
    horaire: '16:00 - 17:00',
    location: 'Bâtiment 4',
    etage: '1er',
    titleBtn: 'Annuler',
  },
];

const getReservationsGrouped = (reservations: ReservationItemProps[]) => {
  const today = new Date();
  const startOfToday = new Date(today.setHours(0, 0, 0, 0));
  const todaysReservations: ReservationItemProps[] = [];
  const upcomingReservations: ReservationItemProps[] = [];

  const { t } = useTranslation();

  reservations.forEach((reservation) => {
    const reservationDate = new Date(reservation.date);
    if (reservationDate.toDateString() === startOfToday.toDateString()) {
      todaysReservations.push(reservation);
    } else if (reservationDate > today) {
      upcomingReservations.push(reservation);
    }
  });

  return { todaysReservations, upcomingReservations };
};

export const ReservationSummaryScreen: React.FC = () => {
  const handleCancelReservation = (index: number) => {
    console.log('Réservation annulée', index);
  };

  const { todaysReservations, upcomingReservations } =
    getReservationsGrouped(fakeReservations);

  return (
    <View style={styles.container}>
      <ReservationSummaryTemplate
        headerTitle={t('headers.recapReservation')}
        todaysReservations={todaysReservations}
        upcomingReservations={upcomingReservations}
        onCancelReservation={handleCancelReservation}
      />
    </View>
  );
};
