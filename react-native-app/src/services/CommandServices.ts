import commandsData from '@assets/data/commands.json';
import { formatCommand } from '@utils/functions';
import { MealProps } from './DispenserServices';
import { MenuProps } from './MenusServices';
import axios from 'axios';
import { API_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { qrcode } from '../assets/data/Images_test/index';

export type Command = {
  command_id: number;
  payment_method: string;
  total_amount: number;
  command_status: string;
  qrcode_link: string;
  pickup_time: string;
  final_pickup_time: string;
  creation_date: string;
  restauration_place_id: number;
  restauration_place_name: string;
};

export type FormattedCommand = Omit<
  Command,
  'pickup_time' | 'final_pickup_time' | 'creation_date'
> & {
  pickup_time: string; // formatted
  final_pickup_time: string; // formatted
  creation_date: string; // formatted
};

export type Order = {
  payment_method: string;
  pickup_time: string;
  lines: {
    [key: string]: {
      quantity: number;
      menu?: {
        id: MenuProps['id'];
        meals: MealProps['id'][];
      };
      meal?: MealProps['id'];
    };
  }[];
};

/**
 * Create the command into the database through the API endpoint
 * @param restaurantId
 * @param command
 * @returns the created command
 */
export const createCommand = async (
  restaurantId: number,
  command: Order
): Promise<{qrcode: string, command_id: number}> => {

  try {
    const [access] = await Promise.all([AsyncStorage.getItem('access')]);
    const response = await axios.post(
      `${API_URL}restaurant/${restaurantId}/`,
      command,
      {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      }
    );

    await AsyncStorage.setItem('qrcode_link', response.data.qrcode);

    if (response.status === 201) {
      return response.data;
    }

    return response.data;
  } catch (error: any) {
    console.error(error);
    throw new Error(
      'Une erreur est survenue lors de la création de la commande'
    );
  }
};
