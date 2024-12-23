import { reservations } from '@assets/data/reservations.json';
import { IconProps } from '@components/atoms';
import { NavItem } from '@components/molecules/BookingInfo';
// import axios from 'axios';

// Mappage des icônes pour chaque propriété
const iconMapping: Record<string, IconProps['name']> = {
  room: 'Cube',
  date: 'Calendar',
  time: 'Clock',
  establishment: 'Home',
  floor: 'Marker',
};

const formatTime = (time: string): string => {
  const [hour, minute] = time.split(':');
  return `${hour}h${minute}`;
};

// Transformation des données de réservation en ne prenant que la première réservation
export const transformBookings = (): NavItem[] => {
  // Récupère uniquement la première réservation
  const booking = reservations[0];

  return [
    {
      icon: iconMapping['room'],
      label: booking.location.location_name,
    },
    {
      icon: iconMapping['date'],
      label: booking.day_reservation,
    },
    {
      icon: iconMapping['time'],
      label: formatTime(booking.start_time),
    },
    {
      icon: iconMapping['establishment'],
      label: booking.establishment.establishment_name,
    },
    {
      icon: iconMapping['floor'],
      label: booking.location.floor_name,
    },
  ];
};
