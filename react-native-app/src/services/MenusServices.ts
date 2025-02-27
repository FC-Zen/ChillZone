import menusData from '@assets/data/menus.json';
import { IconProps } from '@components/atoms';
import { MealProps } from '@services/DispenserServices';
import { ImagesMap } from '@utils';
// import axios from 'axios';

export type CategoryProps = {
  id: number;
  label: string;
};

export type MenuProps = {
  id: number;
  name: string;
  description: string;
  price: string;
  photoUrl: any;
  creationDate: string;
  modificationDate: string;
  categories: CategoryProps[];
  meals: MealProps[];
  iconName: IconProps['name'];
};

export type ModalScreenProps = {
  route: {
    params: {
      menu: {
        id: number;
        name: string;
        description: string;
        price: string;
        photoUrl: any;
        meals: {
          id: number;
          title: string;
          description: string;
          price: string;
          photoUrl: any;
          category: {
            id: number;
            label: string;
          };
        }[];
      };
    };
  };
};

// export const getAllMenus = async (): Promise<MenuProps[]> => {
//   try {
//     const response = await axios.get('');
//     return response.data;
//   } catch (error) {
//     console.error(error);
//     return [];
//   }
// };
export const getAllMenus = (): MenuProps[] => {
  return menusData.map((menu) => {
    const image = ImagesMap[menu.menu_photo];

    const categories = menu.categories.map((category) => ({
      id: category.category_id,
      label: category.category_label,
    }));

    const meals = menu.meals.map((meal) => ({
      id: meal.meal_id,
      title: meal.meal_name,
      description: meal.meal_description,
      price: `${meal.meal_price} €`,
      photoUrl: image,
      category: {
        id: meal.category.category_id,
        label: meal.category.category_label,
      },
    }));

    return {
      id: menu.menu_id,
      name: menu.menu_name,
      description: menu.menu_description,
      price: `${menu.menu_price} €`,
      photoUrl: image,
      creationDate: menu.menu_creation_date,
      modificationDate: menu.menu_modification_date,
      categories,
      meals,
      iconName: 'Add',
    };
  });
};
