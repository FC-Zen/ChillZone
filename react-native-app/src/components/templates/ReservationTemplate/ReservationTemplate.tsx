import React, { FC } from 'react';
import { Text, View } from 'react-native';
import { Input, InputProps } from '@components/molecules';
import { styles } from './style';

export type ReservationTemplateProps = {
  inputs: InputProps[];
  subTitle: string;
};

export const ReservationTemplate: FC<ReservationTemplateProps> = ({
  inputs,
  subTitle,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{subTitle}</Text>
      {inputs.map((inputProps, index) => (
        <View key={index} style={styles.inputContainer}>
          <Input
            {...inputProps}
            style={[{ marginTop: 20 }, inputProps.style]}
          />
          <View style={styles.separator} />
        </View>
      ))}
    </View>
  );
};
