import commandsData from '@assets/data/commands.json';
import { formatCommand } from '@utils/functions';
import { MealProps } from './DispenserServices';
import { MenuProps } from './MenusServices';
import axios from 'axios';
import { API_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

export const getCommands = async (): Promise<FormattedCommand[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const formattedCommands = commandsData.map((command: Command) =>
        formatCommand(command)
      );
      resolve(formattedCommands);
      console.log('formattedCommands: ', formattedCommands);
    }, 1000);
  });
};

// Fonction pour récupérer une commande spécifique avec formatage
export const getCommandById = async (
  id: number
): Promise<FormattedCommand | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const command = commandsData.find((c: Command) => c.command_id === id);
      resolve(command ? formatCommand(command) : undefined);
    }, 1000);
  });
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

export const createCommand = async (
  restaurantId: number,
  command: Order
): Promise<void> => {
  console.log('Commande à envoyer : ', command);
  console.log('Commande lines : ', command.lines);

  console.log('restaurantId : ', restaurantId);
  try {
    const token = await AsyncStorage.getItem('access');
    const response = await axios.post(
      `${API_URL}restaurant/${restaurantId}/`,
      command,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log('response data dans createCommand : ', response.data);

    console.log('Méthode utilisée : ', response.config.method);

    console.log('Allow methods : ', response.headers['allow']);

    if (response.status === 200) {
      console.log('Commande créée avec succès');
      return response.data;
    }
  } catch (error: any) {
    console.error(error);
    throw new Error(
      'Une erreur est survenue lors de la création de la commande'
    );
  }
};
