import React, { useState } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import {
  AlertCancelReservationTemplate,
  AlertHourReservationTemplate,
} from '@components/templates';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@hooks';
import { ROUTE } from '@enums';

export const AlertScreen = () => {
  const [hasAlert, setHasAlert] = useState(true);
  const [showCancelAlert, setShowCancelAlert] = useState(false);

  const { t } = useTranslation();
  const navigation = useNavigation();

  // Fonction pour gérer l'annulation
  const handleCancelPress = () => {
    setShowCancelAlert(true);
    setHasAlert(false);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {showCancelAlert ? (
        <AlertCancelReservationTemplate
          onClose={() => {
            setShowCancelAlert(false);
            setHasAlert(true);
          }}
          word={t('reservationConflicts.timeReservationCancel')}
          button1Props={{
            title: t('buttons.actions.yesCancel'),
            onPress: () => navigation.navigate(ROUTE.HOME),
          }}
        />
      ) : hasAlert ? (
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
            onPress: handleCancelPress,
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
