import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { DispenserTemplate, MenuTemplate } from '@components';
import { colors } from '@theme';
import { styles } from './style';
import { useTranslation } from 'react-i18next';
import { ROUTE } from '@enums';
import { useNavigation } from '@hooks';
import { getAllMeals, MealProps } from '@services/DispenserServices';
import { getAllMenus, MenuProps } from '@services/MenusServices';
import { FoodItemProps } from '@components/organisms/FoodCardList';

export const DispenserScreen: React.FC = () => {
  const [meals, setMeals] = useState<MealProps[]>([]);
  const [menus, setMenus] = useState<MenuProps[]>([]);
  const [isProductSelected, setIsProductSelected] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [mealTypeFilter, setMealTypeFilter] = useState<string>('');
  const navigation = useNavigation();
  const { t } = useTranslation();

  const fetchMeals = async () => {
    const mealData = await getAllMeals();
    setMeals(mealData);
  };

  const fetchMenus = async () => {
    const menuData = await getAllMenus();
    setMenus(menuData);
  };

  useEffect(() => {
    fetchMeals();
    fetchMenus();
  }, []);

  const sortMeals = (meals: MealProps[]) => {
    const order = [
      t('categories.Starter'),
      t('categories.Main'),
      t('categories.Drink'),
      t('categories.Dessert'),
      t('categories.Side'),
      t('categories.Other'),
    ];

    return meals.sort((a, b) => {
      const aIndex = order.indexOf(a.meal_type);
      const bIndex = order.indexOf(b.meal_type);
      return aIndex - bIndex;
    });
  };

  const handleFilterSelect = (option: string) => {
    setSelectedFilter(option);
    if (option === t('categories.Starter')) {
      setMealTypeFilter('Starter');
    } else if (option === t('categories.Main')) {
      setMealTypeFilter('Main');
    } else if (option === t('categories.Drink')) {
      setMealTypeFilter('Drink');
    } else if (option === t('categories.Dessert')) {
      setMealTypeFilter('Dessert');
    } else if (option === t('categories.Side')) {
      setMealTypeFilter('Side');
    } else if (option === t('categories.Other')) {
      setMealTypeFilter('Other');
    } else if (option === t('buttons.actions.filter')) {
      setMealTypeFilter('');
    }
  };

  const handlePress = (isProductButton: boolean) => {
    setIsProductSelected(isProductButton);
  };

  const filteredMeals = sortMeals(
    meals
      .filter((meal) =>
        meal.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .filter((meal) =>
        mealTypeFilter ? meal.meal_type === mealTypeFilter : true
      )
  );

  const handleItemSelect = (item: MealProps) => {
    console.log('Item sélectionné:', item);
    navigation.navigate(ROUTE.DISPENSER_MODAL, { meal: item });
  };

  const handleItemSelectMenu = (item: FoodItemProps) => {
    const selectedMenu = menus.find((menu) => menu.id === item.id);
    if (selectedMenu) {
      console.log('Item sélectionné:', selectedMenu);
      navigation.navigate(ROUTE.MENU_MODAL, { menu: selectedMenu });
    }
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <View style={styles.container}>
      {isProductSelected ? (
        <DispenserTemplate
          selectedButtonMealProps={[
            {
              title: t('categories.Main'),
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
          foodCardListProps={{
            foodItems: filteredMeals.map((meal) => ({
              id: meal.id,
              title: meal.title,
              meal_type: meal.meal_type,
              price: meal.price,
              subTitle: meal.subTitle,
              imageUrl: meal.imageUrl,
              iconName: meal.iconName,
            })),
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
            onBackPress: () => navigation.goBack(),
          }}
          searchItemProps={{
            options: [
              t('buttons.actions.filter'),
              t('categories.Starter'),
              t('categories.Main'),
              t('categories.Drink'),
              t('categories.Dessert'),
              t('categories.Side'),
              t('categories.Other'),
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
        />
      ) : (
        <MenuTemplate
          selectedButtonMealProps={[
            {
              title: t('categories.Main'),
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
          foodCardListProps={{
            foodItems: menus.map((menu) => ({
              id: menu.id,
              title: menu.name,
              price: menu.price,
              meal_type: menu.categories
                .map((category) => category.label)
                .join(', '),
              subTitle: menu.description,
              imageUrl: menu.photoUrl,
              iconName: menu.iconName,
            })),
            onItemSelect: handleItemSelectMenu,
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
            onBackPress: () => navigation.goBack(),
          }}
        />
      )}
    </View>
  );
};
