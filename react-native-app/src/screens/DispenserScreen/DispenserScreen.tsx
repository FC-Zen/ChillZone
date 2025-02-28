import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { DispenserTemplate, MenuTemplate } from '@components';
import { colors } from '@theme';
import { styles } from './style';
import { useTranslation } from 'react-i18next';
import { ROUTE } from '@enums';
import { useNavigation } from '@hooks';
import { fetchAllMeals, MealProps } from '@services/DispenserServices';
import { getAllMenus, MenuProps } from '@services/MenusServices';
import { RestaurantData } from '@services';

type DispenserScreenProps = {
  route: {
    params: {
      restaurantId: RestaurantData['id'];
      restaurantName: RestaurantData['name'];
    };
  };
};

export const DispenserScreen: React.FC<DispenserScreenProps> = ({ route }) => {
  const { restaurantId, restaurantName } = route.params;

  console.log('Dispenser screen Restaurant id: ', restaurantId);
  console.log('🚀 ~ restaurantName:', restaurantName);

  const [mealsByCategory, setMealsByCategory] = useState<
    Record<string, MealProps[]>
  >({});
  const [menus, setMenus] = useState<MenuProps[]>([]);
  const [isProductSelected, setIsProductSelected] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [mealTypeFilter, setMealTypeFilter] = useState<string>('');
  const navigation = useNavigation();
  const { t } = useTranslation();

  useEffect(() => {
    const fetchMeals = async () => {
      const mealData = await fetchAllMeals(restaurantId);
      setMealsByCategory(mealData);
    };

    const fetchMenus = async () => {
      const menuData = await getAllMenus(restaurantId);
      setMenus(menuData);
    };

    fetchMeals();
    fetchMenus();
  }, [restaurantId]);

  const handleFilterSelect = (option: string) => {
    setSelectedFilter(option);
    setMealTypeFilter(option === t('buttons.actions.filter') ? '' : option);
  };

  const handlePress = (isProductButton: boolean) => {
    setIsProductSelected(isProductButton);
  };

  const handleItemSelect = (item: MealProps) => {
    const selectedMeal = Object.values(mealsByCategory)
      .flat()
      .find((meal) => meal.id === item.id);
    if (selectedMeal) {
      console.log('Item sélectionné:', selectedMeal);
      navigation.navigate(ROUTE.DISPENSER_MODAL, { meal: selectedMeal });
    }
  };

  const handleItemSelectMenu = (item: MenuProps) => {
    const selectedMenu = menus.find((menu) => menu.id === item.id);

    if (selectedMenu) {
      navigation.navigate(ROUTE.MENU_MODAL, { menu: selectedMenu });
    }
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  // recherche des plats
  const filteredMeals = Object.entries(mealsByCategory)
    .filter(([category]) => !mealTypeFilter || category === mealTypeFilter)
    .flatMap(([_, meals]) =>
      meals.filter((meal) =>
        meal.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );

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
              category: meal.category,
              description: meal.description,
              name: meal.name,
              price: meal.price,
              photo_link: meal.photo_link,
              stock: meal.stock,
              icon: meal.icon,
            })),
            onItemSelect: handleItemSelect,
          }}
          buttonProps={{
            title: t('buttons.actions.cart'),
            onPress: () => navigation.navigate(ROUTE.CART),
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
              ...Object.keys(mealsByCategory),
            ],
            onSelect: handleFilterSelect,
            initialOption: selectedFilter && t('buttons.actions.filter'),
            iconName: 'CarretUp',
          }}
          inputProps={{
            data: filteredMeals.map((meal) => meal.name),
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
              name: menu.name,
              description: menu.description,
              price: menu.price,
              photo_link: menu.photo_link,
              meals_by_type: menu.meals_by_type,
            })),
            onItemSelectMenu: handleItemSelectMenu,
          }}
          buttonProps={{
            title: t('buttons.actions.cart'),
            onPress: () => navigation.navigate(ROUTE.CART),
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
