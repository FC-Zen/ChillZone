import React from 'react';
import { ScrollView, View } from 'react-native';
import { FoodCard, IconWithText } from '@components/molecules';
import { styles } from './style';
import { IconProps } from '@components/atoms';
import { useTranslation } from 'react-i18next';

export type FoodItemProps = {
  id: number;
  title: string;
  meal_type: string;
  price: string;
  subTitle: string;
  imageUrl: any;
  iconName: IconProps['name'];
};

export type FoodCardListProps = {
  foodItems: FoodItemProps[];
  onItemSelect?: (item: FoodItemProps) => void;
  showTitle?: boolean;
};

export const FoodCardList: React.FC<FoodCardListProps> = ({
  foodItems,
  onItemSelect,
  showTitle = true,
}) => {
  const { t } = useTranslation();

  const getMealTypeLabel = (mealType: string): string => {
    switch (mealType) {
      case 'Starter':
        return t('categories.Starter');
      case 'Main':
        return t('categories.Main');
      case 'Drink':
        return t('categories.Drink');
      case 'Dessert':
        return t('categories.Dessert');
      case 'Side':
        return t('categories.Side');
      case 'Other':
        return t('categories.Other');
      default:
        return mealType;
    }
  };

  const groupedItems = foodItems.reduce(
    (acc, foodItem) => {
      if (!acc[foodItem.meal_type]) {
        acc[foodItem.meal_type] = [];
      }
      acc[foodItem.meal_type].push(foodItem);
      return acc;
    },
    {} as Record<string, FoodItemProps[]>
  );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {Object.entries(groupedItems).map(([mealType, items]) => (
        <View key={mealType}>
          {showTitle && ( // Condition pour afficher le titre
            <IconWithText
              icon="Hamburger"
              iconWidth={24}
              iconHeight={24}
              textStyle={styles.text}
              style={styles.text2}
              variant="horizontal"
              text={getMealTypeLabel(mealType)}
            />
          )}
          {items.map((foodItem) => (
            <View key={foodItem.id}>
              <FoodCard
                title={foodItem.title}
                price={foodItem.price}
                subTitle={foodItem.subTitle}
                imageUrl={foodItem.imageUrl}
                iconName={foodItem.iconName}
                onPress={() => onItemSelect?.(foodItem)}
              />
            </View>
          ))}
        </View>
      ))}
    </ScrollView>
  );
};
