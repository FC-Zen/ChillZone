import reservationsData from '@assets/data/reservations.json';

export type Location = {
  location_id: number;
  location_name: string;
  position_x: number;
  position_y: number;
  floor_name: string;
};

export type Establishment = {
  establishment_id: number;
  establishment_name: string;
};

export type Reservation = {
  reservation_id: number;
  reservation_status: string;
  start_time: string;
  end_time: string;
  day_reservation: string;
  location: Location;
  establishment: Establishment;
};

export type FormattedReservation = Omit<
  Reservation,
  'start_time' | 'end_time' | 'day_reservation'
> & {
  start_time: string; // on formate
  end_time: string; // on formate
  day_reservation: string; // on formate
};

// Fonction utilitaire pour reformater l'heure
const formatTime = (time: string): string => {
  const [hours, minutes] = time.split(':');
  return `${hours}h${minutes}`;
};

// Fonction utilitaire pour reformater la date
const formatDate = (date: string): string => {
  const [year, month, day] = date.split('-');
  const dateObj = new Date(Number(year), Number(month) - 1, Number(day));
  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(dateObj);
};

// Fonction pour reformater une réservation
const formatReservation = (reservation: Reservation): FormattedReservation => ({
  ...reservation,
  start_time: formatTime(reservation.start_time),
  end_time: formatTime(reservation.end_time),
  day_reservation: formatDate(reservation.day_reservation),
});

// Fonction pour récupérer toutes les réservations avec formatage
export const getReservations = async (): Promise<FormattedReservation[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const formattedReservations = reservationsData.reservations.map(
        (reservation: Reservation) => formatReservation(reservation)
      );
      resolve(formattedReservations);
    }, 1000);
  });
};

// Fonction pour récupérer une réservation spécifique avec formatage
export const getReservationById = async (
  id: number
): Promise<FormattedReservation | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const reservation = reservationsData.reservations.find(
        (r: Reservation) => r.reservation_id === id
      );
      resolve(reservation ? formatReservation(reservation) : undefined);
    }, 1000);
  });
};
