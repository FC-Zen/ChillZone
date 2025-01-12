import React from 'react';
import { ScrollView, View } from 'react-native';
import { OverlayList } from '@components/organisms/OverlayList';
import { PageHeader } from '@components/molecules/PageHeader';
import { styles } from './style';
import { BookingOverlay } from '@services';

export type ReservationSummaryTemplateProps = {
  headerTitle: string;
  todaysReservations: BookingOverlay[];
  upcomingReservations: BookingOverlay[];
  onCancelReservation?: (index: number) => void;
  onBackPress?: () => void;
};

export const ReservationSummaryTemplate: React.FC<
  ReservationSummaryTemplateProps
> = ({
  headerTitle,
  todaysReservations,
  upcomingReservations,
  onCancelReservation,
  onBackPress,
}) => {
  return (
    <View style={styles.container}>
      <PageHeader
        title={headerTitle}
        variant="back"
        onBackPress={onBackPress}
      />

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
