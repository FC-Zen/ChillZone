import axios from 'axios';
import { API_URL } from '@env';
import { getAccessToken } from '@utils/functions';

export type LocationProps = {
  id: number;
  name: string;
  description: string;
  photo_link: string;
  capacity: number;
  position_x: number;
  position_y: number;
  room_type: string;
  status: boolean;
};

export type MapFloorProps = {
  id: number;
  number: number;
  name: string;
  photo_link: string;
  locations: LocationProps[];
};

/**
 * Récupère les étages de la carte
 * @returns {Promise<MapFloorProps[]>} Les étages de la carte
 * @throws {Error} Si une erreur est survenue lors de la récupération des étages
 */
export const getAllMapFloors = async (): Promise<MapFloorProps[]> => {
  try {
    const access = await getAccessToken();
    const response = await axios.get(`${API_URL}mapfloor/`, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });

    const mapFloorsData = response.data.floors;
    // console.log(
    //   '📍 Locations dans mapFloorsData:',
    //   JSON.stringify(
    //     mapFloorsData.map((floor: any) => floor.locations),
    //     null,
    //     2
    //   )
    // );

    // console.log('📍 mapFloorsData:', JSON.stringify(mapFloorsData, null, 2));

    if (!mapFloorsData || !Array.isArray(mapFloorsData)) {
      throw new Error('Les données reçues des étages ne sont pas valides.');
    }

    const mapFloors = mapFloorsData.map((floor: any) => ({
      id: floor.id,
      number: floor.number,
      name: floor.name,
      photo_link: `${API_URL}${floor.photo_link}`,
      locations: floor.locations.map((location: any) => ({
        id: location.id,
        name: location.name,
        description: location.description,
        photo_link: `${API_URL}${location.photo_link}`,
        capacity: location.capacity,
        position_x: location.position_x,
        position_y: location.position_y,
        room_type: location.room_type,
        status: location.status,
      })),
    }));

    return mapFloors;
  } catch (error) {
    throw new Error(`Erreur lors de la récupération des étages: ${error}`);
  }
};
