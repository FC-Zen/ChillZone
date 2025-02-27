import React from 'react';
import { ScrollView, View } from 'react-native';
import { FoodCard, IconWithText } from '@components/molecules';
import { styles } from './style';
import { useTranslation } from 'react-i18next';
import { MealProps } from '@services/DispenserServices';

export type FoodCardListProps = {
  foodItems: MealProps[];
  onItemSelect?: (item: MealProps) => void;
  showTitle?: boolean;
};

export const FoodCardList: React.FC<FoodCardListProps> = ({
  foodItems,
  onItemSelect,
  showTitle = true,
}) => {
  const { t } = useTranslation();

  const getMealTypeLabel = (mealType: MealProps['category']): string => {
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
    (acc, item) => {
      const mealType = item.category;
      if (!acc[mealType]) {
        acc[mealType] = [];
      }
      acc[mealType].push(item);
      return acc;
    },
    {} as Record<string, MealProps[]>
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
                title={foodItem.name}
                price={`${foodItem.price} €`}
                subTitle={foodItem.description}
                imageUrl={foodItem.photo_link}
                iconName={foodItem.icon || 'Add'}
                onPress={() => onItemSelect?.(foodItem)}
              />
            </View>
          ))}
        </View>
      ))}
    </ScrollView>
  );
};
