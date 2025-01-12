import React, { useState } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { Button, PageHeader, FoodCardList } from '@components';
import { useNavigation } from '@hooks';
import { styles } from './style';
import { useTranslation } from 'react-i18next';
import { FoodItemProps } from '@components/organisms/FoodCardList';
import { ModalScreenProps } from '@services';
import { useCommand } from '@contexts';

export const MenuModal: React.FC<ModalScreenProps> = ({ route }) => {
  const { menu } = route.params;
  const [quantity, setQuantity] = useState(0);
  const [selectedMeals, setSelectedMeals] = useState<
    Record<string, number | null>
  >({});
  const { listItems, updateListItems } = useCommand();

  const navigation = useNavigation();
  const { t } = useTranslation();

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    if (quantity >= 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    const selectedMealsList = transformedMeals.filter(
      (meal) => selectedMeals[meal.meal_type] === meal.id
    );
    console.log(
      `Ajouté au panier: ${menu.name}, Quantité: ${quantity}, Total : ${menu.price}`,
      'Repas sélectionnés:',
      selectedMealsList
    );
    if (listItems.find((item) => item.name === menu.name)) {
      listItems.map((item) => {
        if (item.name === menu.name) {
          item.quantity += 1;
        }
      });
    }
    else {
      updateListItems([
        ...listItems,
        {
          id: menu.id,
          name: menu.name,
          price: parseFloat(menu.price.replace('€', '')),
          type: 'meal',
          quantity: 1,
          onDecrement: handleDecrement,
          onIncrement: handleIncrement,
          onDelete: () => {
            listItems.filter((item) => item.name !== menu.name);
          },
        },
      ]);
    }
    navigation.goBack();
  };

  const handleMealSelect = (item: FoodItemProps) => {
    setSelectedMeals((prev) => {
      const category = item.meal_type;
      const isSelected = prev[category] === item.id;

      return {
        ...prev,
        [category]: isSelected ? null : item.id,
      };
    });

    if (selectedMeals[item.meal_type] === item.id) {
      console.log('Decrement');
      handleDecrement();
    } else {
      console.log('Increment');
      handleIncrement();
    }
  };

  const transformedMeals: FoodItemProps[] = menu.meals.map((meal) => ({
    id: meal.id,
    title: meal.title,
    subTitle: meal.description,
    imageUrl: meal.photoUrl,
    meal_type: meal.category.label,
    iconName: selectedMeals[meal.category.label] === meal.id ? 'Check' : 'Add',
    isSelected: selectedMeals[meal.id],
  }));

  return (
    <View style={styles.container2}>
      <View style={styles.pageHeader}>
        <PageHeader
          title={menu.name}
          variant="back"
          onBackPress={() => navigation.goBack()}
        />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.cont3}>
          <Image source={menu.photoUrl} style={styles.image} />
          <Text style={styles.price}>{menu.price}</Text>
          <Text style={styles.subtitle}>{menu.description}</Text>
        </View>

        <FoodCardList
          foodItems={transformedMeals}
          onItemSelect={handleMealSelect}
        />
      </ScrollView>

      <View style={styles.btnContainer2}>
        <Button title={t('buttons.add.add')} onPress={handleAddToCart} />
      </View>
    </View>
  );
};
