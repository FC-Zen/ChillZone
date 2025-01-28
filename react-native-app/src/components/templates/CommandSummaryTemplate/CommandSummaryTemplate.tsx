import React from 'react';
import { ScrollView, View } from 'react-native';
import { OverlayCommandList } from '@components/organisms';
import { PageHeader } from '@components/molecules/PageHeader';
import { styles } from './style';
import { FormattedCommand } from '@services';

export type CommandSummaryTemplateProps = {
  headerTitle: string;
  todaysReservations: FormattedCommand[];
  pastReservations: FormattedCommand[];
  onCancelReservation?: (index: number) => void;
  onBackPress?: () => void;
};

export const CommandSummaryTemplate: React.FC<
  CommandSummaryTemplateProps
> = ({
  headerTitle,
  todaysReservations,
  pastReservations,
  onCancelReservation,
  onBackPress,
}) => {
  console.log("Template: ",pastReservations)
  return (
    <View style={styles.container}>
      <PageHeader
        title={headerTitle}
        variant="back"
        onBackPress={onBackPress}
      />

      <ScrollView style={styles.scrollContainer}>
        <View style={styles.marginTop}>
          <OverlayCommandList
            todaysReservations={todaysReservations}
            pastReservations={pastReservations}
            onCancelReservation={onCancelReservation}
          />
        </View>
      </ScrollView>
    </View>
  );
};
