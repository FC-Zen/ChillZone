import { API_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAccessToken } from '@utils/functions';
import axios from 'axios';

export type DurationOptions = {
  Extended: string;
  Short: string;
  Standard: string;
};

export type RoomTypes = string[];

export type ReservationResponse = {
  duration_options: DurationOptions;
  room_types: RoomTypes;
};

export type RoomAvailability = {
  id: number;
  name: string;
  floor: string;
  establishment: string;
  photo: string;
  capacity: number;
  available_slots: [string, string][];
};

export type ReservationRequest = {
  date: string; // Format YYYY-MM-DD
  duration: number; // Durée en minutes (30, 60, 120, etc.)
  type: string[];
};

export type CreateReservationRequest = {
  location_id: number;
  start_time: string; // Format HH:MM:SS
  duration: number; // En minutes
  day_reservation: string; // Format YYYY-MM-DD
};

export type CreateReservationResponse = {
  message: string;
};

export const getReservations = async (): Promise<ReservationResponse> => {
  try {
    const access = await getAccessToken();
    const response = await axios.get(`${API_URL}reservation/`, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });

    if (response.status === 200) {
      return response.data as ReservationResponse;
    }
    throw new Error('Données de réservation incorrectes');
  } catch (error) {
    console.error(error);
    throw new Error('Erreur lors de la récupération des réservations');
  }
};

export const putReservations = async (
  date: string,
  duration: number,
  type: string[]
): Promise<RoomAvailability[]> => {
  try {
    // Conversion vers le format
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;

    const formattedDuration = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:00`;

    //console.log('Durée formatée:', formattedDuration);

    const access = await getAccessToken();
    const response = await axios.put<RoomAvailability[]>(
      `${API_URL}reservation/`,
      {
        date: date,
        duration: formattedDuration, // durée formatée
        type: type,
      },
      { headers: { Authorization: `Bearer ${access}` } }
    );

    return response.data;
  } catch (error: any) {
    console.error(
      'Erreur lors de la vérification des disponibilités:',
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export const createReservation = async (
  locationId: number,
  startTime: string,
  duration: number,
  dayReservation: string
): Promise<CreateReservationResponse> => {
  startTime = startTime.split('h').join(':') + ':00';
  /* console.log(
    'Création de la réservation:',
    locationId,
    startTime,
    duration,
    dayReservation
  ); */
  try {
    const access = await getAccessToken();
    const response = await axios.post<CreateReservationResponse>(
      `${API_URL}reservation/`,
      {
        location_id: locationId,
        start_time: startTime,
        duration: duration,
        day_reservation: dayReservation,
      },
      { headers: { Authorization: `Bearer ${access}` } }
    );

    if (response.status === 201) {
      //console.log('Réservation confirmée:', response.data);
      return response.data;
    }

    throw new Error('Erreur lors de la réservation');
  } catch (error) {
    console.error('Erreur lors de la réservation:', error);
    throw error;
  }
};

export const deleteReservation = async (
  reservationId: number
): Promise<{ message: string }> => {
  try {
    const access = await getAccessToken();
    const response = await axios.delete(`${API_URL}reservation/`, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
      data: {
        id: reservationId,
      },
    });

    if (response.status === 200) {
      return response.data;
    }

    throw new Error("Erreur lors de l'annulation de la réservation");
  } catch (error) {
    console.error("Erreur lors de l'annulation de la réservation:", error);
    throw new Error(
      "Une erreur est survenue lors de l'annulation de la réservation."
    );
  }
};
