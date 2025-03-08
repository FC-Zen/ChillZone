import React, { useState } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { Button, PageHeader, FoodCardList, SnackBar } from '@components';
import { useNavigation } from '@hooks';
import { styles } from './style';
import { useTranslation } from 'react-i18next';
import { ModalScreenProps } from '@services';
import { useCommand } from '@contexts';
import { MealProps } from '@services/DispenserServices';

type SelectedMealsType = {
  [key: string]: number | null;
};

export const MenuModal: React.FC<ModalScreenProps> = ({ route }) => {
  const { menu } = route.params;
  const [quantity, setQuantity] = useState(0);
  const [selectedMeals, setSelectedMeals] = useState<SelectedMealsType>({});

  const { listItems, updateListItems } = useCommand();
  const [snackbar, setSnackbar] = useState<{
    isAvailable: boolean;
    severity: 'success' | 'error';
    message: string;
  }>({
    isAvailable: false,
    severity: 'success',
    message: '',
  });

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
      (meal) => meal.type && selectedMeals[meal.type] === meal.id
    );

    const outOfStockMeal = selectedMealsList.find((meal) => meal.stock === 0);

    if (outOfStockMeal) {
      setSnackbar({
        isAvailable: true,
        severity: 'error',
        message: `Le plat ${outOfStockMeal.name} n'est plus en stock. Désolé !`,
      });
      return;
    }

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
    if (!item.type) return;

    setSelectedMeals((prev) => {
      const isSelected = item.type ? prev[item.type] === item.id : false;

      return {
        ...prev,
        [item.type as string]: isSelected ? null : item.id,
      };
    });

    if (item.type && selectedMeals[item.type] === item.id) {
      handleDecrement();
    } else {
      handleIncrement();
    }
  };

  const transformedMeals: MealProps[] = Object.entries(
    menu.meals_by_type || {}
  ).flatMap(([type, meals]) =>
    meals.map((meal) => ({
      ...meal,
      title: meal.name,
      subTitle: meal.description,
      imageUrl: meal.photo_link,
      type: type,
      category: meal.category,
      icon: selectedMeals[type] === meal.id ? 'Check' : 'Add',
      isSelected: selectedMeals[type] === meal.id,
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

      <SnackBar
        visible={snackbar.isAvailable}
        message={snackbar.message}
        onDismiss={() => setSnackbar({ ...snackbar, isAvailable: false })}
        severity={snackbar.severity}
      />

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
