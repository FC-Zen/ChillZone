import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import {
  AlertCancelReservationTemplate,
  ReportingFormTemplate,
  ReportingFinalFormTemplate,
  AlertHourReservationTemplate,
} from '@components/templates';
import { useNextBooking, useUser } from '@contexts';
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
  const { nextBooking, updateNextBooking } = useNextBooking();
  const [isBooked, setIsBooked] = useState(false);

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

  // Création d'une réservation fictive pour tester l'alerte
  useEffect(() => {
    if (!isBooked) {
      console.log('Booking already created');
      updateNextBooking([
        [
          {
            icon: 'Clock',
            typeLabel: 'timeSlot',
            label: '10:00 - 11:00',
          },
          {
            icon: 'School',
            typeLabel: 'roomName',
            label: 'Salle 1',
          },
          {
            icon: 'Clock',
            typeLabel: 'duration',
            label: '1h',
          },
          {
            icon: 'HomeLocation',
            typeLabel: 'floor',
            label: 'RDC',
          },
        ],
      ]);
    }
  }, [isBooked, updateNextBooking]);

  // Transforme les tableaux de tableaux de NavItem en tableau de BookingInfo
  const transformBooking = (booking: NavItem[][]): BookingInfo[] => {
    const bookingInfo: BookingInfo[] = [];
    booking.forEach((item) => {
      let timeSlot;
      let roomName;
      let duration;
      let floor;
      item.forEach((navItem) => {
        switch (navItem.typeLabel) {
          case 'timeSlot':
            timeSlot = navItem;
            break;
          case 'roomName':
            roomName = navItem;
            break;
          case 'duration':
            duration = navItem;
            break;
          case 'floor':
            floor = navItem;
            break;
        }
      });
      bookingInfo.push({
        timeSlot: timeSlot,
        location: roomName,
        duration: duration,
        floor: floor,
      });
    });
    return bookingInfo;
  };

  const booking = transformBooking(nextBooking)[0];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {showAlertHour && booking && (
        <AlertHourReservationTemplate
          timeSlot={
            booking.timeSlot || { icon: 'Lock', typeLabel: '', label: 'Test' }
          }
          location={
            booking.location || { icon: 'Lock', typeLabel: '', label: 'Test2' }
          }
          duration={
            booking.duration || { icon: 'Lock', typeLabel: '', label: 'Test3' }
          }
          floor={
            booking.floor || { icon: 'Lock', typeLabel: '', label: 'Test4' }
          }
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
            onPress: () => {
              updateNextBooking([]);
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
