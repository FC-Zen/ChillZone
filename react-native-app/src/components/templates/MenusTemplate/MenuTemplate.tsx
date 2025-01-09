import React from 'react';
import { View } from 'react-native';
import {
  SelectedButtonMeal,
  SelectedButtonMealProps,
} from '@components/molecules';
import { FoodCardList, FoodCardListProps } from '@components/organisms';
import { Button, ButtonProps } from '@components/molecules';
import { styles } from './style';
import { PageHeader, PageHeaderProps } from '@components/molecules';

type MenuTemplateProps = {
  selectedButtonMealProps: SelectedButtonMealProps[];
  foodCardListProps: FoodCardListProps;
  buttonProps: ButtonProps;
  pageHeaderProps: PageHeaderProps;
};

export const MenuTemplate: React.FC<MenuTemplateProps> = ({
  selectedButtonMealProps,
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

        <FoodCardList
          foodItems={foodCardListProps.foodItems}
          onItemSelect={foodCardListProps.onItemSelect}
          showTitle={false}
        />

        <View style={styles.buttonContainer}>
          <Button {...buttonProps} />
        </View>
      </View>
    </View>
  );
};
