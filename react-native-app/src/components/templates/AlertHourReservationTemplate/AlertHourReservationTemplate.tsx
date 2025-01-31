import React, { FC } from 'react';
import { View, Text } from 'react-native';
import {
  Button,
  ButtonProps,
  IconWithText,
  PageHeader,
} from '@components/molecules';
import { styles } from './style';
import { colors } from '@theme';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@hooks';
import { ROUTE } from '@enums';
import LottieView from 'lottie-react-native';
import { NavItem } from '@components/molecules/BookingInfo';

export type AlertHourReservationTemplateProps = {
  timeSlot: NavItem;
  location: NavItem;
  duration: NavItem;
  floor: NavItem;
  button1Props: ButtonProps;
  button2Props: ButtonProps;
  button3Props: ButtonProps;
};

export const AlertHourReservationTemplate: FC<
  AlertHourReservationTemplateProps
> = ({
  timeSlot,
  location,
  duration,
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
        <IconWithText
          icon={timeSlot.icon}
          text={timeSlot.label}
          variant={'horizontal'}
          textStyle={styles.timeSlot}
          iconColor={colors.white}
        />

        <View style={styles.iconContainer}>
          <LottieView
            source={require('@assets/Images/Hour.json')}
            autoPlay
            loop
            style={{ width: 200, height: 200 }}
          />
        </View>

        <IconWithText
          icon={location.icon}
          text={location.label}
          variant={'horizontal'}
          textStyle={styles.location}
          iconColor={colors.white}
          iconWidth={16}
          iconHeight={16}
        />
        <IconWithText
          icon={duration.icon}
          text={duration.label}
          variant={'horizontal'}
          textStyle={styles.duration}
          iconColor={colors.white}
          iconWidth={16}
          iconHeight={16}
        />
        <IconWithText
          icon={floor.icon}
          text={floor.label}
          variant={'horizontal'}
          textStyle={styles.floor}
          iconColor={colors.white}
          iconWidth={16}
          iconHeight={16}
        />

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
