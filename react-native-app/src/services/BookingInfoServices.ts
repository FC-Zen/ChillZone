// import axios from 'axios';
import { reservations } from '@assets/data/reservations.json';
import { NavItem } from '@components/molecules/BookingInfo';
import { IconProps } from '@components/atoms';
import { getAccessToken } from '@utils/functions';
import axios from 'axios';
import { API_URL } from '@env';

// Type de réservation
export type Booking = {
  id: number;
  location: {
    location_name: string;
    floor_name: string;
  };
  day_reservation: string;
  start_time: string;
  end_time?: string;
  establishment: {
    establishment_name: string;
  };
};

export type BookingOverlay = {
  id?: number;
  data: Booking;
  title?: string;
  titleBtn?: string;
  cancelReservation?: () => void;
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

  // récupère la reservation à venir depuis le JSON en fonction de la date
  const booking = reservations.find(
    (reservation) =>
      // reservation.day_reservation === '2025-01-01' // pour la simulation
      reservation.day_reservation === new Date().toISOString().split('T')[0]
  );

  const navItems: NavItem[] = [];

  if (!booking) return navItems;

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

export const transformReservations = (): BookingOverlay[] => {
  // const bookings = await fetchBookings(); Récupération des réservations
  // const bookingOverlays: BookingOverlay[] = [];

  // const booking = bookings[0];
  // if (!booking) return bookingOverlays

  const bookingOverlays: BookingOverlay[] = [];

  reservations.forEach((booking) => {
    bookingOverlays.push({
      data: {
        id: booking.reservation_id,
        location: {
          location_name: booking.location.location_name,
          floor_name: booking.location.floor_name,
        },
        day_reservation: booking.day_reservation,
        start_time: booking.start_time.substring(0, 5).replace(':', 'H'),
        end_time: booking.end_time.substring(0, 5).replace(':', 'H'),
        establishment: {
          establishment_name: booking.establishment.establishment_name,
        },
      },
      id: booking.reservation_id,
    });
  });

  return bookingOverlays;
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

export type ReservationSummary = {
  reservation_id: number;
  reservation_status: string;
  start_time: string;
  end_time: string;
  day_reservation: string;
  location_name: string;
  position_x: number;
  position_y: number;
  floor_name: string;
  photo_link: string;
  establishment_name: string;
};

export type MyReservations = {
  past_orders: ReservationSummary[];
  today_reservations: ReservationSummary[];
  upcoming_reservations: ReservationSummary[];
};

export const getMyReservations = async (): Promise<MyReservations> => {
  const access = await getAccessToken();
  try {
    const response = await axios.get(`${API_URL}my-reservation/`, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });

    if (response.status === 200) {
      console.log(
        'upcoming reservations :',
        response.data.upcoming_reservations
      );
      return response.data;
    } else {
      console.log(
        "réponse reçue mais avec un status d'erreur : ",
        response.status
      );
      return {
        past_orders: [],
        today_reservations: [],
        upcoming_reservations: [],
      };
    }
  } catch (error) {
    console.error(error);
    throw new Error('Erreur lors de la récupération des commandes');
  }
};

/**
 * Annule la réservation
 */
export const cancelReservation = async (id: number) => {
  try {
    const token = await getAccessToken();

    const response = await axios.delete(`${API_URL}my-reservation/`, {
      data: { id },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      return {
        success: true,
        message: 'Réservation annulée avec succès.',
        data: response.data,
      };
    } else if (response.status === 404) {
      return {
        success: false,
        message: 'Utilisateur non trouvé ou token invalide.',
      };
    }
  } catch (error: any) {
    console.error(
      'Erreur lors de la suppression de la photo de profil:',
      error.message
    );
    throw new Error(error.message);
  }
};
