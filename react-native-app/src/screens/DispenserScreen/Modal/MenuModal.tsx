import React, { useState } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { Button, PageHeader, FoodCardList } from '@components';
import { useNavigation } from '@hooks';
import { styles } from './style';
import { useTranslation } from 'react-i18next';
import { ModalScreenProps } from '@services';
import { useCommand } from '@contexts';
import { MealProps } from '@services/DispenserServices';

export const MenuModal: React.FC<ModalScreenProps> = ({ route }) => {
  const { menu } = route.params;
  const [quantity, setQuantity] = useState(0);
  const [selectedMeals, setSelectedMeals] = useState<
    Record<string, number | null>
  >({});

  console.log('Menu types : ', menu.meals_by_type);
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
      (meal) => selectedMeals[meal.category] === meal.id
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
    } else {
      updateListItems([
        ...listItems,
        {
          id: menu.id,
          name: menu.name,
          price: parseFloat(menu.price),
          type: 'meal',
          quantity: 1,
          meals: selectedMealsList,
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

  const handleMealSelect = (item: MealProps) => {
    setSelectedMeals((prev) => {
      const category = item.category;
      const isSelected = prev[category] === item.id;

      return {
        ...prev,
        [category]: isSelected ? null : item.id,
      };
    });

    if (selectedMeals[item.category] === item.id) {
      console.log('Decrement');
      handleDecrement();
    } else {
      console.log('Increment');
      handleIncrement();
    }
  };

  const transformedMeals: MealProps[] = Object.entries(
    menu.meals_by_type || {}
  ).flatMap(([category, meals]) =>
    meals.map((meal) => ({
      ...meal,
      title: meal.name,
      subTitle: meal.description,
      imageUrl: meal.photo_link,
      type: category,
      category: meal.category,
      icon: selectedMeals[meal.category] === meal.id ? 'Check' : 'Add',
      isSelected: selectedMeals[meal.id],
    }))
  );

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
          <Image source={{ uri: menu.photo_link }} style={styles.image} />
          <Text style={styles.price}>{menu.price}€</Text>
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
