import { useNavigation, useRoute } from '@hooks';

export type RootStackParamList = {
  Home: undefined;
  Profile: { userId: string };
  Settings: undefined;
};

// Utilisation des hooks
export const useAppNavigation = () => {
  return useNavigation();
};

export const useAppRoute = () => {
  return useRoute();
};
