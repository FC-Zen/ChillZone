import commandsData from '@assets/data/commands.json';
import { formatCommand } from '@utils/functions';

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
      const command = commandsData.find(
        (c: Command) => c.command_id === id
      );
      resolve(command ? formatCommand(command) : undefined);
    }, 1000);
  });
};
