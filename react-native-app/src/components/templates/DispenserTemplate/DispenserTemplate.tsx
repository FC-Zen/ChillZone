import React from 'react';
import { View, ScrollView } from 'react-native';
import {
  SearchItem,
  SearchItemProps,
  Field,
  FieldProps,
  SelectedButtonMeal,
  SelectedButtonMealProps,
} from '@components/molecules';
import { FoodCardList, FoodCardListProps } from '@components/organisms';
import { Button, ButtonProps } from '@components/molecules';
import { styles } from './style';
import { PageHeader, PageHeaderProps } from '@components/molecules/PageHeader';

type DispenserTemplateProps = {
  selectedButtonMealProps: SelectedButtonMealProps[];
  searchItemProps: SearchItemProps;
  fieldProps: FieldProps;
  foodCardListProps: FoodCardListProps;
  buttonProps: ButtonProps;
  pageHeaderProps: PageHeaderProps;
};

export const DispenserTemplate: React.FC<DispenserTemplateProps> = ({
  selectedButtonMealProps,
  searchItemProps,
  fieldProps,
  foodCardListProps,
  buttonProps,
  pageHeaderProps,
}) => {
  return (
    <View style={styles.container}>
      <PageHeader {...pageHeaderProps} />
      <View style={styles.row}>
        {selectedButtonMealProps.map((props, index) => (
          <View key={index} style={styles.selectedButtonMeal}>
            <SelectedButtonMeal {...props} />
          </View>
        ))}
      </View>
      <View style={styles.row}>
        <View>
          <SearchItem {...searchItemProps} />
        </View>
        <View>
          <Field {...fieldProps} />
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <FoodCardList {...foodCardListProps} />
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button {...buttonProps} />
      </View>
    </View>
  );
};
