import React from 'react';
import { View, Text } from 'react-native';
import { BookingInfo, ReservationButton } from '@components/molecules';
import { styles } from './style';
import { useTranslation } from 'react-i18next';

export const Map = () => {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>{t('info.reservation')}</Text>
      <View>
        <BookingInfo />
      </View>
      <ReservationButton
        title={t('buttons.actions.cancelReservation')}
        onPress={() => {}}
        iconName="Cross"
      />
    </View>
  );
};
