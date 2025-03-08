import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';
import {
  AlertCancelReservationTemplate,
  ReportingFormTemplate,
  ReportingFinalFormTemplate,
  AlertHourReservationTemplate,
} from '@components/templates';
import { useNextBooking } from '@contexts';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@hooks';
import { ROUTE } from '@enums';
import { NavItem } from '@components/molecules/BookingInfo';

type BookingInfo = {
  timeSlot?: NavItem;
  location?: NavItem;
  duration?: NavItem;
  floor?: NavItem;
};

export const AlertScreen = () => {
  const [showAlertHour, setShowAlertHour] = useState(true);
  const [showCancelAlert, setShowCancelAlert] = useState(false);
  const [showReportingForm, setShowReportingForm] = useState(false);
  const [showFinalAlert, setShowFinalAlert] = useState(false);
  const [comment, setComment] = useState('');
  const { nextBooking, setNextBooking } = useNextBooking();

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

  // Transforme les tableaux de tableaux de NavItem en tableau de BookingInfo
  const transformBooking = (booking: NavItem[]): BookingInfo[] => {
    const bookingInfo: BookingInfo[] = [];
    let timeSlot;
    let roomName;
    let duration;
    let floor;
    booking.forEach((item) => {
      switch (item.typeLabel) {
        case 'timeSlot':
          timeSlot = item;
          break;
        case 'roomName':
          roomName = item;
          break;
        case 'duration':
          duration = item;
          break;
        case 'floor':
          floor = item;
          break;
      }
    });
    bookingInfo.push({
      timeSlot: timeSlot,
      location: roomName,
      duration: duration,
      floor: floor,
    });

    return bookingInfo;
  };

  const booking = nextBooking ? transformBooking(nextBooking)[0] : null;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {showAlertHour && booking && (
        <AlertHourReservationTemplate
          timeSlot={
            booking.timeSlot || { icon: 'Lock', typeLabel: '', label: '' }
          }
          location={
            booking.location || { icon: 'Lock', typeLabel: '', label: '' }
          }
          duration={
            booking.duration || { icon: 'Lock', typeLabel: '', label: '' }
          }
          floor={booking.floor || { icon: 'Lock', typeLabel: '', label: '' }}
          button1Props={{
            title: t('buttons.actions.yesImHere'),
            onPress: () => navigation.navigate(ROUTE.HOME),
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
            onPress: () => {
              setNextBooking([]);
              navigation.navigate(ROUTE.HOME);
            },
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
              handleFinalPress();
            },
          }}
          comment={comment}
          setComment={setComment}
          onClose={() => {
            setShowReportingForm(false);
            setShowAlertHour(true);
          }}
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
