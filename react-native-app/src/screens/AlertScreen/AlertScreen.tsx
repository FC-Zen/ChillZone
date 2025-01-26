import React, { useState } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import {
  AlertCancelReservationTemplate,
  ReportingFormTemplate, // Remplacez par votre template
} from '@components/templates';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@hooks';
import { ROUTE } from '@enums';

export const AlertScreen = () => {
  const [hasAlert, setHasAlert] = useState(true);
  const [showCancelAlert, setShowCancelAlert] = useState(false);
  const [comment, setComment] = useState(''); // État pour le commentaire

  const { t } = useTranslation();
  const navigation = useNavigation();

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
        <ReportingFormTemplate
          word={t('reservationConflicts.timeReservationConflictCareful')}
          wordPara={t('reservationConflicts.timeReservationConflict1')}
          wordPara2={t('reservationConflicts.timeReservationConflict2')}
          button1Props={{
            title: t('buttons.actions.conflictReservation'),
            onPress: () => {
              // logique à faire
              console.log(comment);
            },
          }}
          comment={comment}
          setComment={setComment}
          onClose={() => setHasAlert(false)}
          onConflictPress={handleCancelPress}
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
