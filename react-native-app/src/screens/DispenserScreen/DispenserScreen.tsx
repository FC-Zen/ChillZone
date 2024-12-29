import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { DispenserTemplate } from '@components';
import { colors } from '@theme';
import { styles } from './style';
import { useTranslation } from 'react-i18next';
import { ROUTE } from '@enums';
import { useNavigation } from '@hooks';
import { getAllMeals, MealProps } from '@services/DispenserServices';

export const DispenserScreen: React.FC = () => {
  const [meals, setMeals] = useState<MealProps[]>([]); // Pour stocker les repas récupérés
  const [isProductSelected, setIsProductSelected] = useState(true);
  const [isSelected, setIsSelected] = useState(false);
  const { t } = useTranslation();
  const [selectedFilter, setSelectedFilter] = useState<string>(
    t('categories.product')
  );
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [mealTypeFilter, setMealTypeFilter] = useState<string>('');
  const navigation = useNavigation();

  const fetchMeals = async () => {
    const mealData = await getAllMeals();
    setMeals(mealData);
  };

  useEffect(() => {
    fetchMeals();
  }, []);

  // Fonction pour trier les repas par type
  const sortMeals = (meals: MealProps[]) => {
    const order = [
      t('categories.entry'),
      t('categories.product'),
      t('categories.drink'),
      t('categories.desserts'),
    ];

    return meals.sort((a, b) => {
      const aIndex = order.indexOf(a.meal_type);
      const bIndex = order.indexOf(b.meal_type);
      return aIndex - bIndex;
    });
  };

  // Fonction pour gérer le changement de filtre de type de repas
  const handleFilterSelect = (option: string) => {
    setSelectedFilter(option);
    console.log('Option sélectionnée :', option);

    if (option === t('categories.entry')) {
      setMealTypeFilter('Starter');
    } else if (option === t('categories.product')) {
      setMealTypeFilter('Main');
    } else if (option === t('categories.drink')) {
      setMealTypeFilter('Drink');
    } else if (option === t('categories.desserts')) {
      setMealTypeFilter('Dessert');
    } else if (option === t('categories.sides')) {
      setMealTypeFilter('Side');
    } else if (option === t('categories.other')) {
      setMealTypeFilter('Other');
    }
  };

  const handlePress = (isProductButton: boolean) => {
    setIsProductSelected(isProductButton);
  };

  // Filtrage et tri des repas en fonction du type et de la recherche
  const foodItems = sortMeals(
    meals
      .filter(
        (meal) => meal.title.toLowerCase().includes(searchQuery.toLowerCase()) // Filtrage basé sur la recherche
      )
      .filter((meal) =>
        mealTypeFilter ? meal.meal_type === mealTypeFilter : true
      )
  ).map((meal) => ({
    id: meal.id,
    title: meal.title,
    meal_type: meal.meal_type,
    price: meal.price,
    subTitle: meal.subTitle,
    imageUrl: meal.imageUrl,
    iconName: meal.iconName,
  }));

  const handleItemSelect = (item: MealProps) => {
    console.log('Item sélectionné:', item);
    navigation.navigate(ROUTE.DISPENSER_MODAL, { meal: item });
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
            onPress: () => handlePress(true),
            color: isProductSelected ? colors.aquaDeep : colors.darkCyan,
          },
          {
            title: t('categories.menus'),
            isSelected: !isProductSelected,
            onPress: () => handlePress(false),
            color: !isProductSelected ? colors.aquaDeep : colors.darkCyan,
          },
        ]}
        searchItemProps={{
          options: [
            t('categories.entry'),
            t('categories.product'),
            t('categories.drink'),
            t('categories.desserts'),
            t('categories.sides'),
            t('categories.other'),
          ],
          onSelect: handleFilterSelect,
          initialOption: selectedFilter && t('buttons.actions.filter'),
          iconName: 'CarretUp',
        }}
        inputProps={{
          data: meals.map((meal) => meal.title),
          onFilter: handleSearchChange,
          onChangeText: handleSearchChange,
          value: searchQuery,
          icon: 'Search',
          placeholder: t('fields.search'),
        }}
        foodCardListProps={{
          foodItems: foodItems,
          onItemSelect: handleItemSelect,
        }}
        buttonProps={{
          title: t('buttons.actions.cart'),
          onPress: () => console.log('Go panier'), // panier
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
          onBackPress: () => navigation.goBack(),
        }}
      />
    </View>
  );
};
