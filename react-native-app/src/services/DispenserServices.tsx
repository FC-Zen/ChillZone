import { IconProps } from '@components/atoms';
import { API_URL } from '@env';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type MealProps = {
  category: string;
  type?: string;
  description: string;
  id: number;
  name: string;
  photo_link: string;
  price: number;
  stock: number;
  tags?: [];
  icon?: IconProps['name'];
};

export const fetchAllMeals = async (
  RestaurantID: number
): Promise<Record<string, MealProps[]>> => {
  console.log('Fetch meals du restau:', RestaurantID);

  const [access] = await Promise.all([AsyncStorage.getItem('access')]);
  console.log('🚀 ~ token:', access);

  try {
    console.log('URL: ', `${API_URL}restaurant/${RestaurantID}/`);

    const response = await axios.get(`${API_URL}restaurant/${RestaurantID}/`, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });

    const { aLaCarte } = response.data;
    if (!aLaCarte || typeof aLaCarte !== 'object') {
      throw new Error(
        `Les données reçues du restaurant ${RestaurantID} ne sont pas valides.`
      );
    }

    const groupedMeals: Record<string, MealProps[]> = {};

    for (const [category, meals] of Object.entries(aLaCarte)) {
      if (Array.isArray(meals)) {
        let filteredMeals = meals.filter((meal) => meal.stock > 0);
        groupedMeals[category] = filteredMeals.map((meal) => ({
          id: meal.id,
          name: meal.name,
          description: meal.description,
          photo_link: `${API_URL}${meal.photo_link}`,
          price: meal.price,
          stock: meal.stock,
          category: category,
          type: category,
          tags: meal.tags,
          icon: 'Add',
        }));
      }
    }

    return groupedMeals;
  } catch (error: any) {
    console.error('Erreur lors de la récupération des plats:', error.message);
    throw new Error(error.message);
  }
};
