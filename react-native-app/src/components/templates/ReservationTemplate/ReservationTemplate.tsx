import React, { FC } from 'react';
import { ScrollView, Text, View } from 'react-native';
import {
  Button,
  ButtonProps,
  Input,
  InputProps,
  PageHeader,
} from '@components/molecules';
import { styles } from './style';
import { RoomAvailable, RoomSelectorProps } from '@components/organisms';
import { colors } from '@theme';

export type ReservationTemplateProps = {
  buttonProps: ButtonProps;
  inputs: InputProps[][];
  titleHeader: string;
  subTitle: string;
  subTitle2?: string;
  roomSelectorProps: RoomSelectorProps;
};

export const ReservationTemplate: FC<ReservationTemplateProps> = ({
  buttonProps,
  inputs,
  titleHeader,
  subTitle,
  subTitle2,
  roomSelectorProps,
}) => {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <PageHeader title={titleHeader} variant="default" />

        <View style={styles.padd}>
          <Text style={styles.title}>{subTitle}</Text>
          {inputs.map((inputGroup, groupIndex) => (
            <View key={groupIndex}>
              {inputGroup.map((inputProps, index) => (
                <Input key={index} {...inputProps} style={{ marginTop: 15 }} />
              ))}
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

        <View style={styles.padd2}>
          <RoomAvailable {...roomSelectorProps} />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            {...buttonProps}
            color={colors.white}
            style={{ backgroundColor: colors.darkCyan }}
          />
        </View>
      </ScrollView>
    </View>
  );
};
