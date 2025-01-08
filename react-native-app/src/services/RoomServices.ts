import { rooms } from '@assets/data/rooms.json';
// import axios from 'axios';

// const apiUrl = ''; // URL de l'API

export type Room = {
  id?: number;
  name?: string;
  description?: string;
  capacity?: number;
  status?: boolean;
  position_x?: number;
  position_y?: number;
  floor?: number;
  photo_link?: any;
  tag_label?: string;
};

export type RoomsResponse = {
  rooms: Room[];
};

// Fonction pour récupérer toutes les salles
export const getRooms = async (): Promise<Room[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(rooms);
    }, 1000);
  });

  /*
  try {
    const response = await axios.get('');
    return response.data.rooms;
  } catch (error: any) {
    console.error('Erreur lors de la récupération des salles :', error.message);
    throw new Error("Impossible de récupérer les salles.");
  }
  */
};

// Fonction pour récupérer une salle par son ID
export const getRoomById = async (id: number): Promise<Room | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const room = rooms.find((room: Room) => room.id === id); // Données statiques (JSON local)
      resolve(room);
    }, 1000);
  });

  /*
  try {
    const response = await axios.get('');
    return response.data;
  } catch (error: any) {
    console.error(`Erreur lors de la récupération de la salle ID ${id} :`, error.message);
    throw new Error("Impossible de récupérer la salle demandée.");
  }
  */
};
