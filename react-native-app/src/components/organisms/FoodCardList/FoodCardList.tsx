import React from 'react';
import { ScrollView, View } from 'react-native';
import { FoodCard, IconWithText } from '@components/molecules';
import { styles } from './style';
import { IconProps } from '@components/atoms';

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
  iconName: IconProps['name'];
  text: string;
};

export const FoodCardList: React.FC<FoodCardListProps> = ({
  foodItems,
  onItemSelect,
  iconName,
  text,
}) => {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <IconWithText
        icon={iconName}
        iconWidth={24}
        iconHeight={24}
        textStyle={styles.text}
        style={styles.text2}
        variant="horizontal"
        text={text}
      />{' '}
      {/* Utilisation des props */}
      {foodItems.map((foodItem) => (
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
    </ScrollView>
  );
};
