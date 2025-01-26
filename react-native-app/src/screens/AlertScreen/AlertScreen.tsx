import React, { useState } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { AlertHourReservationTemplate } from '@components/templates';
import { useTranslation } from 'react-i18next';

export const AlertScreen = () => {
  const [hasAlert, setHasAlert] = useState(true);

  const { t } = useTranslation();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {hasAlert ? (
        <AlertHourReservationTemplate
          timeSlot="12H00 - 13H00"
          location="Salle 001"
          address="IUT Champs sur Marne"
          floor="Étage 1"
          button1Props={{
            title: t('buttons.actions.yesImHere'),
            onPress: () => alert('Vous avez confirmé votre présence !'),
          }}
          button2Props={{
            title: t('buttons.actions.imCanceling'),
            onPress: () => alert('Vous avez annulé votre réservation.'),
          }}
          button3Props={{
            title: t('buttons.actions.conflictReservation'),
            onPress: () => alert('Un problème a été signalé.'),
          }}
        />
      ) : (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <Text>Aucune alerte pour le moment.</Text>
        </View>
      )}
    </SafeAreaView>
  );
};
