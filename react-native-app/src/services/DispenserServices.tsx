import { IconProps } from '@components/atoms';
import { API_URL } from '@env';
import { SessionContext } from '@contexts';
import axios from 'axios';

export type MealProps = {
  category: string;
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
  const sessionContext = SessionContext.getInstance();
  const crsfToken = sessionContext.getCsrfToken();

  try {
    const response = await axios.get(`${API_URL}restaurant/${RestaurantID}`, {
      withCredentials: true,
      headers: {
        'X-CSRF-Token': crsfToken,
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
        groupedMeals[category] = meals.map((meal) => ({
          id: meal.id,
          name: meal.name,
          description: meal.description,
          photo_link: meal.photo_link,
          price: meal.price,
          stock: meal.stock,
          category: meal.category,
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
