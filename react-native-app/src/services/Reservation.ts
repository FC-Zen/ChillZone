import axios from 'axios';
import { API_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

export const getReservations = async (): Promise<ReservationResponse> => {
  try {
    const [access] = await Promise.all([AsyncStorage.getItem('access')]);
    const response = await axios.get(`${API_URL}reservation/`, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });
    console.log('response: ', response.data);

    if (response.status === 200) {
      return response.data as ReservationResponse;
    }
    throw new Error('Données de réservation incorrectes');
  } catch (error) {
    console.error(error);
    throw new Error('Erreur lors de la récupération des réservations');
  }
};
