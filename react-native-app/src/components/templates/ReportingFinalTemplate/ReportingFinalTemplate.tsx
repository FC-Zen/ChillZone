import React, { FC } from 'react';
import { View, Text, Keyboard } from 'react-native';
import { Button, ButtonProps, PageHeader } from '@components/molecules';
import { styles } from './style';
import { colors } from '@theme';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@hooks';
import LottieView from 'lottie-react-native';

export type ReportingFinalProps = {
  word: string;
  button1Props: ButtonProps;
  onClose?: () => void;
};

export const ReportingFinalFormTemplate: FC<ReportingFinalProps> = ({
  word,
  button1Props,
  onClose,
}) => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <PageHeader
        title={t('headers.finalConflict')}
        variant="default"
        onBackPress={() => {
          navigation.goBack();
          if (onClose) onClose();
        }}
        colorTitle={colors.white}
        colorArrow={colors.white}
      />
      <View style={styles.iconContainer}>
        <LottieView
          source={require('@assets/Images/Warning.json')}
          autoPlay
          loop
          style={{ width: 200, height: 200 }}
        />
      </View>
      <View style={styles.cont2}>
        <Text style={styles.word}>{word}</Text>
        <View style={styles.buttonContainer}>
          <Button
            {...button1Props}
            textColor={colors.darkWarn}
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
