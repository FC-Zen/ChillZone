import React, { FC } from 'react';
import { ScrollView, Text, View } from 'react-native';
import {
  Button,
  ButtonProps,
  IconWithText,
  Input,
  InputProps,
  PageHeader,
} from '@components/molecules';
import { styles } from './style';
import { RoomAvailable, RoomSelectorProps } from '@components/organisms';
import { colors } from '@theme';
import { useTranslation } from 'react-i18next';
import { RoomAvailability } from '@services';

export type ReservationTemplateProps = {
  buttonProps: ButtonProps;
  inputs: InputProps[][];
  titleHeader: string;
  subTitle: string;
  subTitle2?: string;
  roomSelectorProps: RoomSelectorProps;
  selectedRoom?: RoomAvailability | null;
  disabled: boolean;
};

export const ReservationTemplate: FC<ReservationTemplateProps> = ({
  buttonProps,
  inputs,
  titleHeader,
  subTitle,
  subTitle2,
  roomSelectorProps,
  disabled,
}) => {
  const { t } = useTranslation();
  const areAllInputsFilled = () => {
    return inputs.every((inputGroup) =>
      inputGroup.every((input) => {
        if (input.placeholder === t('fields.room.schedules')) {
          return true;
        }
        if (input.variant === 'select' || input.variant === 'modal-select') {
          return input.value && input.value !== '';
        }
        return false;
      })
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <PageHeader title={titleHeader} variant="default" />

        <View style={styles.padd}>
          <Text style={styles.title}>{subTitle}</Text>
          {inputs.map((inputGroup, groupIndex) => (
            <View key={groupIndex}>
              {inputGroup.map((inputProps, index) => {
                const isScheduleInput =
                  inputProps.placeholder === t('fields.room.schedules');
                const isEmpty = !inputProps.value || inputProps.value === '';

                return (
                  <View key={index}>
                    <Input {...inputProps} style={{ marginTop: 15 }} />

                    {isScheduleInput && isEmpty && (
                      <IconWithText
                        text={t('reservationConflicts.selectHour')}
                        icon="CrossCircle"
                        iconHeight={20}
                        iconWidth={20}
                        variant="horizontal"
                        textColor={colors.warn}
                        iconColor={colors.warn}
                        style={{
                          marginTop: 10,
                          alignSelf: 'flex-start',
                        }}
                      />
                    )}
                  </View>
                );
              })}
              {groupIndex < inputs.length - 1 && (
                <View>
                  <View style={styles.separator} />
                  <Text style={styles.titleSep}>{subTitle2}</Text>
                </View>
              )}
            </View>
          ))}

          <View style={styles.separator} />
        </View>

        {areAllInputsFilled() && (
          <View style={styles.padd2}>
            <RoomAvailable {...roomSelectorProps} />
          </View>
        )}

        <View style={styles.buttonContainer}>
          <Button
            {...buttonProps}
            disabled={disabled}
            color={colors.white}
            style={{
              backgroundColor: !disabled ? colors.darkCyan : colors.silver,
              opacity: disabled ? 0.1 : 1,
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};
