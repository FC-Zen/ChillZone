import React from 'react';
import { ScrollView, View } from 'react-native';
import { FoodCard } from '@components/molecules';
import { styles } from './style';
import { IconProps } from '@components/atoms';

export type FoodItemProps = {
  id: number;
  title: string;
  price: string;
  subTitle: string;
  imageUrl: any;
  iconName: IconProps['name'];
};

export type FoodCardListProps = {
  foodItems: FoodItemProps[];
  onItemSelect?: (item: FoodItemProps) => void;
};

export const FoodCardList: React.FC<FoodCardListProps> = ({
  foodItems,
  onItemSelect,
}) => {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {foodItems.map((foodItem) => (
        <View key={foodItem.id} style={styles.cardContainer}>
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
    </ScrollView>
  );
};
