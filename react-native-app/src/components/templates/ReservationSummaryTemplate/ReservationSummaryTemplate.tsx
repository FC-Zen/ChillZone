import React from 'react';
import { ScrollView, View } from 'react-native';
import { OverlayList } from '@components/organisms/OverlayList';
import { PageHeader } from '@components/molecules/PageHeader';
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

export type ReservationSummaryTemplateProps = {
  headerTitle: string;
  todaysReservations: ReservationItemProps[];
  upcomingReservations: ReservationItemProps[];
  onCancelReservation?: (index: number) => void;
};

export const ReservationSummaryTemplate: React.FC<
  ReservationSummaryTemplateProps
> = ({
  headerTitle,
  todaysReservations,
  upcomingReservations,
  onCancelReservation,
}) => {
  return (
    <View style={styles.container}>
      <PageHeader title={headerTitle} variant="back" />

      <ScrollView style={styles.scrollContainer}>
        <View style={styles.marginTop}>
          <OverlayList
            todaysReservations={todaysReservations}
            upcomingReservations={upcomingReservations}
            onCancelReservation={onCancelReservation}
          />
        </View>
      </ScrollView>
    </View>
  );
};
