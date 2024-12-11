import { RouteProps } from 'react-router-dom';
import { ROUTE } from '@enums';

export type RootStackParamList = {
  [ROUTE.LOGIN_SCREEN]: undefined;
};

export type RouteParamList = {
  LoginScreen: undefined;
};

// Typage des propriétés des écrans
export type ScreenProps<T extends keyof RouteParamList> = RouteProps & {
  route: {
    params: RouteParamList[T];
  };
};
