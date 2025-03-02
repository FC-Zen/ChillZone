import { SessionContext } from '@contexts';
import { API_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MealProps } from '@services/DispenserServices';
import { ImagesMap } from '@utils';
import axios from 'axios';

export type MenuProps = {
  id: number;
  name: string;
  description: string;
  price: string;
  photo_link: string;
  meals_by_type: Record<string, MealProps[]>;
};

export type ModalScreenProps = {
  route: {
    params: {
      menu: MenuProps;
    };
  };
};

export const getAllMenus = async (
  RestaurantID: number
): Promise<MenuProps[]> => {
  try {
    const token = await AsyncStorage.getItem('access');

    // Requête pour récupérer les menus
    const response = await axios.get(`${API_URL}restaurant/${RestaurantID}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const menusData = response.data.menus;

    if (!menusData || !Array.isArray(menusData)) {
      throw new Error(
        `Les données reçues du restaurant ${RestaurantID} ne sont pas valides.`
      );
    }

    const menus = menusData.map((menu: MenuProps) => {
      const meals_by_type: Record<string, MealProps[]> = {};
      for (const [type, subCategories] of Object.entries(menu.meals_by_type)) {
        const allMeals = Object.values(subCategories)
          .flat()
          .filter((meal) => meal !== undefined);

        meals_by_type[type] = Array.isArray(allMeals)
          ? allMeals.map((meal: MealProps) => ({
              id: meal.id,
              name: meal.name,
              description: meal.description,
              price: meal.price,
              stock: meal.stock,
              category: meal.category,
              tags: meal.tags || [],
              photo_link: meal.photo_link,
            }))
          : [];
      }

      return {
        id: menu.id,
        name: menu.name,
        description: menu.description,
        price: menu.price,
        photoUrl: ImagesMap[menu.photo_link] || null,
        meals_by_type,
        photo_link: menu.photo_link,
      };
    });

    return menus;
  } catch (error: any) {
    console.error('Erreur lors de la récupération des menus:', error.message);
    throw new Error(error.message);
  }
};
