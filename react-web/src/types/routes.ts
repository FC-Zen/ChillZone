import { RouteProps } from 'react-router-dom';
import { ROUTE } from '@enums';

export type RootStackParamList = {
  [ROUTE.LOGIN]: undefined;
  [ROUTE.FORGOT_PASSWORD]: undefined;
  [ROUTE.FORGOT_MDP]: undefined;
  [ROUTE.RESET_PASSWORD]: undefined;
};

export type RouteParamList = {
  Home: undefined;
  Login: undefined;
  ForgotPasswordScreen: undefined;
  ForgotMdpScreen: undefined;
  ResetPasswordScreen: undefined;
};

// Typage des propriétés des écrans
export type ScreenProps<T extends keyof RouteParamList> = RouteProps & {
  route: {
    params: RouteParamList[T];
  };
};
