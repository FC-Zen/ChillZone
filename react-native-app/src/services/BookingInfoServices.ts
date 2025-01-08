// import axios from 'axios';
import { reservations } from '@assets/data/reservations.json';
import { NavItem } from '@components/molecules/BookingInfo';
import { IconProps } from '@components/atoms';

// Type de réservation
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

// Fonction de mise en forme de l'heure
const formatTime = (time: string): string => {
  const [hour, minute] = time.split(':');
  return `${hour}h${minute}`;
};

/**
 * Récupère les réservations depuis l'API
 * Fonction qui sera utilisé quand nous aurons l'API
 * @returns {Promise<Booking[]>} Liste des réservations
 */
export const fetchBookings = async (): Promise<Booking[]> => {
  try {
    /* Appel à l'API pour récupérer les réservations
    const response = await axios.get('');
    return response.data;
    */
    // Simulation de données
    return [
      {
        id: 1,
        location: { location_name: 'Salle A', floor_name: 'Étage 1' },
        day_reservation: '2025-01-01',
        start_time: '09:00',
        establishment: { establishment_name: 'Campus XYZ' },
      },
    ];
  } catch (error: any) {
    console.error('Erreur lors de la récupération des réservations:', error);
    throw new Error('Impossible de récupérer les réservations.');
  }
};

/**
 * Transforme les données de réservation en NavItems pour affichage.
 * @returns {Promise<NavItem[]>} Liste des éléments de navigation.
 */
// export const transformBookings = async (): Promise<NavItem[]> => { // avec API
export const transformBookings = (): NavItem[] => {
  // const bookings = await fetchBookings(); Récupération des réservations
  // const navItems: NavItem[] = [];

  // const booking = bookings[0];
  // if (!booking) return navItems;

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

/**
 * Récupère les salles disponibles depuis l'API
 * @returns {Promise<any[]>} Liste des salles dispo
 */
export const fetchAvailableRooms = async (): Promise<any[]> => {
  try {
    /* Appel à l'API pour récupérer les salles disponibles
    const response = await axios.get('');
    return response.data;
    */
    // Simulation de données
    return [
      { id: 1, name: 'Salle A', capacity: 20 },
      { id: 2, name: 'Salle B', capacity: 15 },
    ];
  } catch (error: any) {
    console.error(
      'Erreur lors de la récupération des salles disponibles:',
      error
    );
    throw new Error('Impossible de récupérer les salles disponibles.');
  }
};

/**
 * Récupère les enums depuis l'API.
 * @returns {Promise<any>} Liste des enums
 */
export const fetchEnums = async (): Promise<any> => {
  try {
    /* Appel à l'API pour récupérer les enums
    const response = await axios.get('');
    return response.data;
    */
    // Simulation de données
    return {
      durations: ['30 min', '1 heure', '2 heures'],
      timeSlots: ['08:00', '09:00', '10:00'],
    };
  } catch (error: any) {
    throw new Error('Impossible de récupérer les enums.');
  }
};
