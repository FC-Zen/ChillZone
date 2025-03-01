import { getAccessToken } from '@utils/functions';
import axios from 'axios';
import { API_URL } from '@env';

type ApiRestaurant = {
  id: number;
  name: string;
  description: string;
  location: string;
  restauration_type: string;
  opening_time: string;
  closing_time: string;
  photo_link: string;
};

type RestaurantsApiResponse = {
  non_crous_restaurants: ApiRestaurant[];
  crous_restaurants: ApiRestaurant[];
  fridges: ApiRestaurant[];
};

export type RestaurantData = {
  id: number;
  name: string;
  photo_link: string;
  opening_time?: string;
  closing_time?: string;
  status: 'Ouvert' | 'Fermé';
};

// Vérifie si le restaurant est ouvert ou fermé
const isRestaurantOpen = (
  openingTime: string,
  closingTime: string
): boolean => {
  const now = new Date();
  const currentTime = now.getHours() * 60 + now.getMinutes();

  const [openingHour, openingMinute] = openingTime
    .split(':')
    .slice(0, 2)
    .map(Number);
  const [closingHour, closingMinute] = closingTime
    .split(':')
    .slice(0, 2)
    .map(Number);

  const openingTimeInMinutes = openingHour * 60 + openingMinute;
  const closingTimeInMinutes = closingHour * 60 + closingMinute;

  return (
    currentTime >= openingTimeInMinutes && currentTime <= closingTimeInMinutes
  );
};

const transformApiRestaurantToRestaurantData = (
  restaurant: ApiRestaurant
): RestaurantData => {
  const { id, name, photo_link, opening_time, closing_time } = restaurant;

  const formattedOpeningTime = opening_time.slice(0, 5); // "08:00:00" -> "08:00"
  const formattedClosingTime = closing_time.slice(0, 5); // "19:00:00" -> "19:00"

  const status = isRestaurantOpen(formattedOpeningTime, formattedClosingTime)
    ? 'Ouvert'
    : 'Fermé';

  return {
    id,
    name,
    photo_link,
    opening_time: formattedOpeningTime,
    closing_time: formattedClosingTime,
    status,
  };
};

export const transformRestaurantsApiResponse = (
  response: RestaurantsApiResponse
): RestaurantData[] => {
  const allRestaurants = [
    ...response.non_crous_restaurants,
    ...response.crous_restaurants,
    ...response.fridges,
  ];

  return allRestaurants.map(transformApiRestaurantToRestaurantData);
};

export const transformRestaurantData = async (): Promise<RestaurantData[]> => {
  try {
    const access = await getAccessToken();

    console.log('Access FAQ : ', access);
    if (!access) {
      console.error('Pas de token access');
      return [];
    }

    const response = await axios.get(`${API_URL}restaurants/`, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });

    const allRestaurants: RestaurantData[] = transformRestaurantsApiResponse(
      response.data
    );
    console.log('Restaurants transformés:', allRestaurants);

    return allRestaurants;
  } catch (error: any) {
    console.error(
      'Erreur lors de la récupération des restaurants:',
      error.message
    );
    throw new Error(error.message);
  }
};
