import React, { FC } from 'react';
import { View, Text } from 'react-native';
import { Button, ButtonProps, PageHeader } from '@components/molecules';
import { styles } from './style';
import { colors } from '@theme';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@hooks';
import { ROUTE } from '@enums';
import LottieView from 'lottie-react-native';

export type AlertCancelReservationProps = {
  word: string;
  button1Props: ButtonProps;
  onClose?: () => void;
};

export const AlertCancelReservationTemplate: FC<
  AlertCancelReservationProps
> = ({ word, button1Props, onClose }) => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <PageHeader
        title={t('headers.cancelReservation')}
        variant="back"
        onBackPress={() => {
          navigation.goBack();
          if (onClose) onClose();
        }}
        colorTitle={colors.white}
        colorArrow={colors.white}
      />

      <View style={styles.cont2}>
        <View style={styles.iconContainer}>
          <LottieView
            source={require('@assets/Images/Hour.json')}
            autoPlay
            loop
            style={{ width: 200, height: 200 }}
          />
        </View>

        <Text style={styles.word}>{word}</Text>

        <View style={styles.buttonContainer}>
          <Button
            {...button1Props}
            textColor={colors.aquaDeep}
            style={[styles.button, styles.primaryButton]}
            onPress={() => {
              if (button1Props.onPress) button1Props.onPress();
              if (onClose) onClose();
            }}
          />
        </View>
      </View>
    </View>
  );
};
