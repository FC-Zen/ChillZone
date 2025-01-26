import React, { useState } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import {
  AlertCancelReservationTemplate,
  ReportingFormTemplate,
  ReportingFinalFormTemplate,
  AlertHourReservationTemplate,
} from '@components/templates';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@hooks';
import { ROUTE } from '@enums';

export const AlertScreen = () => {
  const [showAlertHour, setShowAlertHour] = useState(true);
  const [showCancelAlert, setShowCancelAlert] = useState(false);
  const [showReportingForm, setShowReportingForm] = useState(false);
  const [showFinalAlert, setShowFinalAlert] = useState(false);
  const [comment, setComment] = useState('');

  const { t } = useTranslation();
  const navigation = useNavigation();

  const handleCancelPress = () => {
    setShowCancelAlert(true);
    setShowAlertHour(false);
  };

  const handleConflictPress = () => {
    setShowReportingForm(true);
    setShowAlertHour(false);
  };

  const handleFinalPress = () => {
    setShowFinalAlert(true);
    setShowReportingForm(false);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {showAlertHour && (
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
            onPress: handleConflictPress,
          }}
        />
      )}
      {showCancelAlert && (
        <AlertCancelReservationTemplate
          onClose={() => {
            setShowCancelAlert(false);
            setShowAlertHour(true);
          }}
          word={t('reservationConflicts.timeReservationCancel')}
          button1Props={{
            title: t('buttons.actions.yesCancel'),
            onPress: () => navigation.navigate(ROUTE.HOME),
          }}
        />
      )}
      {showReportingForm && (
        <ReportingFormTemplate
          word={t('reservationConflicts.timeReservationConflictCareful')}
          wordPara={t('reservationConflicts.timeReservationConflict1')}
          wordPara2={t('reservationConflicts.timeReservationConflict2')}
          button1Props={{
            title: t('buttons.actions.conflictReservation'),
            onPress: () => {
              console.log(comment);
              handleFinalPress();
            },
          }}
          comment={comment}
          setComment={setComment}
          onClose={() => setShowAlertHour(true)}
          onConflictPress={handleCancelPress}
        />
      )}
      {showFinalAlert && (
        <ReportingFinalFormTemplate
          word={t('reservationConflicts.timeReservationConflictDone')}
          button1Props={{
            title: t('buttons.auth.returnHome'),
            onPress: () => {
              navigation.navigate(ROUTE.HOME);
            },
          }}
          onClose={() => {
            setShowFinalAlert(false);
            navigation.navigate(ROUTE.HOME);
          }}
        />
      )}
    </SafeAreaView>
  );
};
