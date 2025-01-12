import React from 'react';
import { View, Text } from 'react-native';
import { BookingInfo, ReservationButton } from '@components/molecules';
import { styles } from './style';
import { useTranslation } from 'react-i18next';
import { NavItem } from '@components/molecules/BookingInfo';

type ReservationButtonProps = React.ComponentProps<typeof ReservationButton>;

type MapProps = {
  items: NavItem[];
  reservationButtonProps: ReservationButtonProps;
};

export const Map: React.FC<MapProps> = ({ items, reservationButtonProps }) => {
  const { t } = useTranslation();
  const reservationText = t('info.reservation');
  const reservationWords = reservationText.split(' ');
  if (items === undefined) {
    items = [];
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>
        <Text style={styles.highlightedText}>{reservationWords[0]} </Text>
        {reservationWords.slice(1).join(' ')}
      </Text>
      <View>
        <BookingInfo items={items} />
      </View>
      {items.length !== 0 && <ReservationButton {...reservationButtonProps} />}
    </View>
  );
};
