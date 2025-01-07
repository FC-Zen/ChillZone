import { reservations } from '@assets/data/reservations.json';
import { IconProps } from '@components/atoms';
import { NavItem } from '@components/molecules/BookingInfo';
// import axios from 'axios';

export type Booking = {
  id: number;
  location: {
    location_name: string;
    floor_name: string;
  };
  day_reservation: string;
  start_time: string;
  establishment: {
    establishment_name: string;
  };
};

// Mappage des icônes pour chaque propriété
const iconMapping: Record<string, IconProps['name']> = {
  roomName: 'School',
  date: 'Calendar',
  timeSlot: 'Clock',
  duration: 'Calendar',
  establishment: 'Home',
  floor: 'HomeLocation',
  capacity: 'List',
};

const formatTime = (time: string): string => {
  const [hour, minute] = time.split(':');
  return `${hour}h${minute}`;
};

export const transformBookings = (): NavItem[] => {
  const booking = reservations[0];

  const navItems: NavItem[] = [];

  if (booking.location.location_name) {
    navItems.push({
      icon: iconMapping['roomName'],
      label: booking.location.location_name,
    });
  }

  if (booking.day_reservation) {
    navItems.push({
      icon: iconMapping['date'],
      label: booking.day_reservation,
    });
  }

  if (booking.start_time) {
    navItems.push({
      icon: iconMapping['timeSlot'],
      label: formatTime(booking.start_time),
    });
  }

  if (booking.establishment.establishment_name) {
    navItems.push({
      icon: iconMapping['establishment'],
      label: booking.establishment.establishment_name,
    });
  }

  if (booking.location.floor_name) {
    navItems.push({
      icon: iconMapping['floor'],
      label: booking.location.floor_name,
    });
  }

  return navItems;
};
