import { Command, FormattedCommand } from '@services';
import { FormattedReservation, Reservation } from '@services/Reservation';

/**
 * Formate une heure au format "hh:mm" en "hhhmm"
 * @param {string} time - L'heure au format hh:mm
 * @returns {string} L'heure formatée
 */
export const formatTime = (time: string): string => {
  const [hours, minutes] = time.split(':');
  return `${hours}h${minutes}`;
};

/**
 * Formate une date au format "YYYY-MM-DD" en "DD Mois AAAA".
 * @param {string} date - La date au format YYYY-MM-DD
 * @returns {string} La date formatée
 */
export const formatDate = (date: string): string => {
  const [year, month, day] = date.split('-');
  const dateObj = new Date(Number(year), Number(month) - 1, Number(day));
  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(dateObj);
};

/**
 * Reformate une réservation en adaptant les formats de date et heure
 * @param {Reservation} reservation - L'objet réservation de base
 * @returns {FormattedReservation} L'objet réservation formaté
 */
export const formatReservation = (
  reservation: Reservation
): FormattedReservation => ({
  ...reservation,
  start_time: formatTime(reservation.start_time),
  end_time: formatTime(reservation.end_time),
  day_reservation: formatDate(reservation.day_reservation),
});

export const formatCommand = (command: Command): FormattedCommand => {
  const extractDate = (dateTime: string): string => dateTime.split('T')[0];

  const formatDateToNumeric = (dateString: string): string => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Mois commence à 0
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return {
    ...command,
    pickup_time: formatTime(command.pickup_time),
    final_pickup_time: formatTime(command.final_pickup_time),
    creation_date: formatDateToNumeric(extractDate(command.creation_date)), // Format changé ici
  };
};