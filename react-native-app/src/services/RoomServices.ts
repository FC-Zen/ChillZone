import { rooms } from '@assets/data/rooms.json';

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
};

// Fonction pour récupérer une salle par son ID
export const getRoomById = async (id: number): Promise<Room | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const room = rooms.find((room: Room) => room.id === id);
      resolve(room);
    }, 1000);
  });
};
