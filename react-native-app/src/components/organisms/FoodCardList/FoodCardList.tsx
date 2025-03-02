import React from 'react';
import { ScrollView, View } from 'react-native';
import { FoodCard, IconWithText } from '@components/molecules';
import { styles } from './style';
import { useTranslation } from 'react-i18next';
import { MealProps } from '@services/DispenserServices';
import { MenuProps } from '@services';

export type FoodCardListProps = {
  foodItems: (MealProps | MenuProps)[];
  onItemSelect?: (item: MealProps) => void;
  onItemSelectMenu?: (item: MenuProps) => void;
  showTitle?: boolean;
};

export const FoodCardList: React.FC<FoodCardListProps> = ({
  foodItems,
  onItemSelect,
  onItemSelectMenu,
  showTitle = true,
}) => {
  const { t } = useTranslation();

  const getMealTypeLabel = (mealType: MealProps['type']): string => {
    console.log('mealType : ', mealType);
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
        return mealType || '';
    }
  };

  const groupedItems = foodItems.reduce(
    (acc, item) => {
      if ('type' in item) {
        console.log('item type :', item.type);
        const mealType = item?.type || 'Other';
        if (!acc[mealType]) {
          acc[mealType] = [];
        }
        acc[mealType].push(item);
      } else {
        const menuType = item.name;
        if (!acc[menuType]) {
          acc[menuType] = [];
        }
        acc[menuType].push(item);
      }
      return acc;
    },
    {} as Record<string, (MealProps | MenuProps)[]>
  );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {Object.entries(groupedItems).map(([mealType, items]) => (
        <View key={mealType}>
          {showTitle && (
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
                title={'name' in foodItem ? foodItem.name : 'Untitled'}
                price={'price' in foodItem ? `${foodItem.price} €` : 'N/A'}
                subTitle={
                  'description' in foodItem
                    ? foodItem.description
                    : 'No description'
                }
                imageUrl={'photo_link' in foodItem ? foodItem.photo_link : ''}
                iconName={(foodItem as MealProps).icon || 'Add'}
                onPress={() => {
                  if ('meals_by_type' in foodItem) {
                    onItemSelectMenu?.(foodItem as MenuProps);
                  } else {
                    onItemSelect?.(foodItem as MealProps);
                  }
                }}
              />
            </View>
          ))}
        </View>
      ))}
    </ScrollView>
  );
};
