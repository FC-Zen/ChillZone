import axios from 'axios';
import { API_URL } from '@env';
import { getAccessToken } from '@utils/functions';

export type Notification = {
  command: boolean;
  event: boolean;
  reservation: boolean;
};

export type UpdateNotificationRequest = {
  command: boolean;
  event: boolean;
  reservation: boolean;
};

export const getNotifications = async (): Promise<Notification[]> => {
  try {
    const access = await getAccessToken();
    console.log('🔵 [GET] Récupération des notifications...');

    const response = await axios.get(`${API_URL}notification/`, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });

    console.log('✅ [GET] Notifications reçues:', response.data);

    if (response.status === 200) {
      return response.data;
    }
    throw new Error('Erreur lors de la récupération des notifications');
  } catch (error) {
    console.error(
      '❌ [GET] Erreur lors de la récupération des notifications:',
      error
    );
    throw new Error('Erreur lors de la récupération des notifications');
  }
};

export const updateNotification = async (
  data: UpdateNotificationRequest
): Promise<Notification> => {
  try {
    const access = await getAccessToken();

    console.log('🟡 [PUT] Envoi des nouvelles préférences:', data);

    const response = await axios.put<Notification>(
      `${API_URL}notification/`,
      data,
      {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      }
    );

    console.log('✅ [PUT] Mise à jour réussie:', response.data);

    if (response.status === 200) {
      return response.data;
    }
    throw new Error('Erreur lors de la mise à jour de la notification');
  } catch (error) {
    console.error(
      '❌ [PUT] Erreur lors de la mise à jour de la notification:',
      error
    );
    throw new Error('Erreur lors de la mise à jour de la notification');
  }
};
