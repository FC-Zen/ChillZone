import axios from 'axios';
import { getAccessToken } from '@utils/functions';
import { API_URL } from '@env';

export type Order = {
  id: number;
  payment_method: string;
  status: string;
  qrcode_link: string;
  pickup_time: string;
  creation_date: string;
  restauration_place: string;
  total_price: number;
};

export type AllOrders = {
  today_orders: Order[];
  past_orders: Order[];
};

export const getAllOrders = async (): Promise<AllOrders> => {
  const access = await getAccessToken();
  try {
    const response = await axios.get(`${API_URL}my-commands/`, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });

    if (response.status === 200) {
      console.log('Dernière commande : ', response.data);
      return response.data;
    } else {
      console.log(
        "réponse reçue mais avec un status d'erreur : ",
        response.status
      );
      return { today_orders: [], past_orders: [] };
    }
  } catch (error) {
    console.error(error);
    throw new Error('Erreur lors de la récupération des commandes');
  }
};
