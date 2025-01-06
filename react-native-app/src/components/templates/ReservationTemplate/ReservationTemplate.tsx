import React, { FC } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Input, InputProps } from '@components/molecules';
import { styles } from './style';

export type ReservationTemplateProps = {
  inputs: InputProps[][];
  subTitle: string;
  subTitle2?: string;
};

export const ReservationTemplate: FC<ReservationTemplateProps> = ({
  inputs,
  subTitle,
  subTitle2,
}) => {
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        style={styles.scrollView}
      >
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
      </ScrollView>
    </View>
  );
};
