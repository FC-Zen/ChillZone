import React from 'react';
import { View, ScrollView } from 'react-native';
import {
  SearchItem,
  SearchItemProps,
  Input,
  InputProps,
  SelectedButtonMeal,
  SelectedButtonMealProps,
} from '@components/molecules';
import { FoodCardList, FoodCardListProps } from '@components/organisms';
import { Button, ButtonProps } from '@components/molecules';
import { styles } from './style';
import { PageHeader, PageHeaderProps } from '@components/molecules';

type DispenserTemplateProps = {
  selectedButtonMealProps: SelectedButtonMealProps[];
  searchItemProps: SearchItemProps;
  inputProps: InputProps;
  foodCardListProps: FoodCardListProps;
  buttonProps: ButtonProps;
  pageHeaderProps: PageHeaderProps;
};

export const DispenserTemplate: React.FC<DispenserTemplateProps> = ({
  selectedButtonMealProps,
  searchItemProps,
  inputProps,
  foodCardListProps,
  buttonProps,
  pageHeaderProps,
}) => {
  return (
    <View style={styles.outerContainer}>
      <PageHeader {...pageHeaderProps} />

      <View style={styles.container}>
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
            <Input variant="search" {...inputProps} style={styles.search} />
          </View>
        </View>

        <FoodCardList
          foodItems={foodCardListProps.foodItems}
          onItemSelect={foodCardListProps.onItemSelect}
        />

        <View style={styles.buttonContainer}>
          <Button {...buttonProps} />
        </View>
      </View>
    </View>
  );
};
