import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { DispenserTemplate, FoodCardList } from '@components';
import { colors } from '@theme';
import { styles } from './style';
import { useTranslation } from 'react-i18next';
import { ROUTE } from '@enums';
import { useNavigation } from '@hooks';
import { getAllMeals, MealProps } from '@services/DispenserServices';

export const DispenserScreen: React.FC = () => {
  const [meals, setMeals] = useState<MealProps[]>([]); // Pour stocker les repas récupérés
  const [isProductSelected, setIsProductSelected] = useState(true); // Par défaut, "Product" est sélectionné
  const [isSelected, setIsSelected] = useState(false);
  const { t } = useTranslation();
  const [selectedFilter, setSelectedFilter] = useState<string>(
    t('categories.product')
  );
  const [searchQuery, setSearchQuery] = useState<string>(''); // Nouvel état pour la recherche
  const [mealTypeFilter, setMealTypeFilter] = useState<string>(''); // Initialisation à une valeur vide
  const navigation = useNavigation();

  const fetchMeals = async () => {
    const mealData = await getAllMeals();
    setMeals(mealData);
  };

  useEffect(() => {
    fetchMeals();
  }, []);

  // Fonction pour gérer le changement de filtre de type de repas
  const handleFilterSelect = (option: string) => {
    setSelectedFilter(option);
    console.log('Option sélectionnée :', option);

    // Définir le filtre en fonction de l'option sélectionnée
    if (option === t('categories.entry')) {
      setMealTypeFilter('Starter');
    } else if (option === t('categories.product')) {
      setMealTypeFilter('Main');
    } else if (option === t('categories.drink')) {
      setMealTypeFilter('Drink');
    } else if (option === t('categories.desserts')) {
      setMealTypeFilter('Dessert');
    }
  };

  const handlePress = (isProductButton: boolean) => {
    // Toggle the selection between the two buttons
    if (isProductButton) {
      setIsProductSelected(true); // Product button is selected
    } else {
      setIsProductSelected(false); // Menus button is selected
    }
  };

  // Filtrage des repas en fonction du type et de la recherche
  const foodItems = meals
    .filter(
      (meal) => meal.title.toLowerCase().includes(searchQuery.toLowerCase()) // Filtrage basé sur la recherche
    )
    .filter((meal) =>
      mealTypeFilter ? meal.meal_type === mealTypeFilter : true
    )
    .map((meal) => ({
      id: meal.id,
      title: meal.title,
      meal_type: meal.meal_type,
      price: meal.price,
      subTitle: meal.subTitle,
      imageUrl: meal.imageUrl,
      iconName: meal.iconName,
    }));

  const color = isSelected ? colors.aquaDeep : colors.darkCyan;

  const handleItemSelect = (item: MealProps) => {
    console.log('Item sélectionné:', item);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <View style={styles.container}>
      <DispenserTemplate
        selectedButtonMealProps={[
          {
            title: t('categories.product'),
            isSelected: isProductSelected,
            onPress: () => handlePress(true), // Sélectionne le premier bouton
            color: isProductSelected ? colors.aquaDeep : colors.darkCyan, // Applique la couleur en fonction de la sélection
          },
          {
            title: t('categories.menus'),
            isSelected: !isProductSelected,
            onPress: () => handlePress(false), // Sélectionne le deuxième bouton
            color: !isProductSelected ? colors.aquaDeep : colors.darkCyan, // Applique la couleur en fonction de la sélection
          },
        ]}
        searchItemProps={{
          options: [
            t('categories.entry'),
            t('categories.product'),
            t('categories.drink'),
            t('categories.desserts'),
          ],
          onSelect: handleFilterSelect,
          initialOption: selectedFilter && t('buttons.actions.filter'),
          iconName: 'CarretUp',
        }}
        fieldProps={{
          data: meals.map((meal) => meal.title),
          onFilter: handleSearchChange,
          iconName: 'Search',
          placeholder: t('fields.search'),
        }}
        foodCardListProps={{
          foodItems: foodItems,
          onItemSelect: handleItemSelect,
          iconName: 'Hamburger',
          text: mealTypeFilter
            ? t(`${selectedFilter}`)
            : t('categories.product'),
        }}
        buttonProps={{
          title: t('buttons.actions.cart'),
          onPress: () => console.log('Go panier'),
        }}
        pageHeaderProps={{
          title: t('categories.restaurants'),
          variant: 'back',
          icon: {
            name: 'Cross',
            color: colors.black,
            width: 16,
            height: 16,
          },
          onBackPress: () => navigation.navigate(ROUTE.HOME),
        }}
      />
    </View>
  );
};
