import mealsData from '@assets/data/meals.json';
import { IconProps } from '@components/atoms';
import { ImagesMap } from '@utils'; // Assurez-vous d'importer ImageMap

export type MealProps = {
  id: number;
  title: string;
  meal_type: string;
  price: number;
  subTitle: string;
  imageUrl: any;
  iconName: IconProps['name'];
};

export const getAllMeals = (): MealProps[] => {
  return mealsData.map((meal) => {
    const image = ImagesMap[meal.meal_photo];
    return {
      id: meal.meal_id,
      title: meal.meal_name,
      meal_type: meal.meal_type,
      price: meal.meal_price,
      subTitle: meal.meal_description,
      imageUrl: image,
      iconName: 'Add',
    };
  });
};
