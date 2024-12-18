import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { ROUTE } from '@enums';

export type RootStackParamList = {
  [ROUTE.HOME]: { userName: string };
  [ROUTE.LOGIN_SCREEN]: undefined;
  [ROUTE.FORGOT_PASSWORD]: undefined;
  [ROUTE.FORGOT_MDP]: undefined;
  [ROUTE.RESET_PASSWORD]: undefined;
  [ROUTE.NOTIFICATION]: undefined;
};

// Définition des routes et de leurs paramètres
export type RouteParamList = {
  HomeScreen: undefined;
  LoginScreen: undefined; // Correspond à ROUTE.LOGIN_SCREEN
  ForgotPasswordScreen: undefined;
  ForgotMdpScreen: undefined;
  ResetPasswordScreen: undefined;
  NOrification: undefined;
};

// Typage des propriétés des écrans
export type ScreenProps<T extends keyof RouteParamList> = {
  navigation: StackNavigationProp<RouteParamList, T>;
  route: RouteProp<RouteParamList, T>;
};
