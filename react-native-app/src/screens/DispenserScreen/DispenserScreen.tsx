import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { DispenserTemplate } from '@components';
import { colors } from '@theme';
import { styles } from './style';
import { useTranslation } from 'react-i18next';
import { ROUTE } from '@enums';
import { useNavigation } from '@hooks';
import { getAllMeals, MealProps } from '@services/DispenserServices'; // Assurez-vous d'importer la fonction

export const DispenserScreen: React.FC = () => {
  const [meals, setMeals] = useState<MealProps[]>([]); // Pour stocker les repas récupérés
  const [isSelected, setIsSelected] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string>('Filtrer');
  const { t } = useTranslation();
  const navigation = useNavigation();

  // Transformer les données récupérées
  const fetchMeals = async () => {
    const mealData = getAllMeals(); // Récupérer toutes les données de repas
    setMeals(mealData);
  };

  useEffect(() => {
    fetchMeals();
  }, []);

  // Gérer la sélection des filtres
  const handleFilterSelect = (option: string) => {
    setSelectedFilter(option);
    console.log('Option sélectionnée :', option);
  };

  const handlePress = () => {
    setIsSelected(!isSelected);
  };

  const foodItems = meals.map((meal) => ({
    id: meal.id,
    title: meal.title,
    price: meal.price,
    subTitle: meal.subTitle,
    imageUrl: meal.imageUrl,
    iconName: meal.iconName,
  }));

  const color = isSelected ? colors.aquaDeep : colors.darkCyan;

  const handleItemSelect = (item: MealProps) => {
    console.log('Item sélectionné:', item);
  };

  return (
    <View style={styles.container}>
      <DispenserTemplate
        selectedButtonMealProps={[
          {
            title: t('categories.product'),
            isSelected: isSelected,
            onPress: handlePress,
            color: color,
          },
          {
            title: t('categories.menus'),
            isSelected: !isSelected,
            onPress: handlePress,
            color: color,
          },
        ]}
        searchItemProps={{
          options: [
            t('categories.menus'),
            t('categories.product'),
            t('categories.drink'),
            t('categories.desserts'),
          ],
          onSelect: handleFilterSelect,
          initialOption: selectedFilter,
          iconName: 'CarretUp',
        }}
        fieldProps={{
          data: meals.map((meal) => meal.title),
          onFilter: (filteredData) => console.log(filteredData),
          iconName: 'Search',
          placeholder: t('fields.search'),
        }}
        foodCardListProps={{
          foodItems: foodItems,
          onItemSelect: handleItemSelect,
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
