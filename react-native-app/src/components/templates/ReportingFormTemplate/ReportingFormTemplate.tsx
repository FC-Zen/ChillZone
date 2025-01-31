import React, { FC } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { Button, ButtonProps, PageHeader } from '@components/molecules';
import { styles } from './style';
import { colors } from '@theme';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@hooks';

export type ReportingFormProps = {
  word: string;
  wordPara: string;
  wordPara2: string;
  button1Props: ButtonProps;
  comment: string;
  setComment: (text: string) => void;
  onClose?: () => void;
  onConflictPress?: () => void;
};

export const ReportingFormTemplate: FC<ReportingFormProps> = ({
  word,
  wordPara,
  wordPara2,
  button1Props,
  comment,
  setComment,
  onClose,
  onConflictPress,
}) => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <PageHeader
          title={t('headers.conflictReservation')}
          variant="back"
          onBackPress={() => {
            if (onClose) onClose();
          }}
          colorTitle={colors.white}
          colorArrow={colors.white}
        />
        <View style={styles.cont2}>
          <Text style={styles.word}>{word}</Text>
          <Text style={styles.word2}>{wordPara}</Text>
          <Text style={styles.word2}>{wordPara2}</Text>

          <TextInput
            style={styles.commentInput}
            placeholder={t('fields.common.commentary')}
            placeholderTextColor={colors.silver}
            value={comment}
            onChangeText={setComment}
            multiline
            numberOfLines={4}
          />

          <View style={styles.buttonContainer}>
            <Button
              {...button1Props}
              textColor={colors.darkWarn}
              style={[styles.button, styles.primaryButton]}
              onPress={() => {
                if (button1Props.onPress) button1Props.onPress();
              }}
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
