import React, { FC } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Button, ButtonProps, PageHeader } from '@components/molecules';
import { styles } from './style';
import { colors } from '@theme';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@hooks';
import { ROUTE } from '@enums';
import LottieView from 'lottie-react-native';

export type AlertHourReservationTemplateProps = {
  timeSlot: string;
  location: string;
  address: string;
  floor: string;
  button1Props: ButtonProps;
  button2Props: ButtonProps;
  button3Props: ButtonProps;
};

export const AlertHourReservationTemplate: FC<
  AlertHourReservationTemplateProps
> = ({
  timeSlot,
  location,
  address,
  floor,
  button1Props,
  button2Props,
  button3Props,
}) => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <PageHeader
        title={t('headers.timeReservation')}
        variant="back"
        onBackPress={() => navigation.navigate(ROUTE.HOME)}
        colorTitle={colors.white}
        colorArrow={colors.white}
      />

      <View style={styles.cont2}>
        <Text style={styles.timeSlot}>{timeSlot}</Text>

        <View style={styles.iconContainer}>
          <LottieView
            source={require('@assets/Images/Hour.json')}
            autoPlay
            loop
            style={{ width: 200, height: 200 }}
          />
        </View>

        <Text style={styles.location}>{location}</Text>
        <Text style={styles.address}>{address}</Text>
        <Text style={styles.floor}>{floor}</Text>

        <View style={styles.buttonContainer}>
          <Button
            {...button1Props}
            style={[styles.button, styles.primaryButton]}
          />
          <Button
            {...button2Props}
            style={[styles.button, styles.secondaryButton]}
          />
          <Button
            {...button3Props}
            style={[styles.button, styles.dangerButton]}
          />
        </View>
      </View>
    </View>
  );
};
