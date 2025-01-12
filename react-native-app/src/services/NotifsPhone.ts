import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import Constants from 'expo-constants';

class NotifsPhone {
  private static instance: NotifsPhone;

  private constructor() {}

  public static getInstance(): NotifsPhone {
    if (!NotifsPhone.instance) {
      NotifsPhone.instance = new NotifsPhone();
    }
    return NotifsPhone.instance;
  }

  async registerForPushNotificationsAsync(): Promise<string | null> {
    let token: string | null = null;

    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return null;
      }

      try {
        const projectId =
          Constants.expoConfig?.extra?.eas?.projectId ??
          Constants.easConfig?.projectId;

        if (!projectId) {
          throw new Error('Project ID not found');
        }

        token = (
          await Notifications.getExpoPushTokenAsync({
            projectId,
          })
        ).data;
        console.log('Push notification token:', token);
      } catch (error) {
        console.error('Failed to get push token:', error);
        return null;
      }
    } else {
      alert('Must use a physical device for Push Notifications');
    }

    return token;
  }

  async scheduleNotification(
    title: string,
    body: string,
    data: object = {}
  ): Promise<void> {
    await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        data,
      },
      trigger: null,
    });
  }

  configureNotificationHandler(): void {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
      }),
    });
  }
}

export default NotifsPhone.getInstance();
