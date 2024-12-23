import { restauration_places } from '@assets/data/restauration_places.json';
// import axios from 'axios';

type RestaurantData = {
  id: number;
  name: string;
  photo_link: any;
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
  const currentTime = now.getHours() * 60 + now.getMinutes(); // Temps actuel en minutes

  const [openingHour, openingMinute] = openingTime.split(':').map(Number);
  const [closingHour, closingMinute] = closingTime.split(':').map(Number);

  const openingTimeInMinutes = openingHour * 60 + openingMinute;
  const closingTimeInMinutes = closingHour * 60 + closingMinute;

  return (
    currentTime >= openingTimeInMinutes && currentTime <= closingTimeInMinutes
  );
};

export const transformRestaurantData = (): RestaurantData[] => {
  return restauration_places.map((restaurant) => {
    const { id, name, photo_link, opening_time, closing_time } = restaurant;
    const status = isRestaurantOpen(opening_time, closing_time)
      ? 'Ouvert'
      : 'Fermé';

    return {
      id,
      name,
      photo_link,
      opening_time,
      closing_time,
      status,
    };
  });
};
