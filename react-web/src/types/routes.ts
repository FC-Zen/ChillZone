import { RouteProps } from 'react-router-dom';
import { ROUTE } from '@enums';

export type RootStackParamList = {
  [ROUTE.LOGIN]: undefined;
  [ROUTE.FORGOT_PASSWORD]: undefined;
  [ROUTE.FORGOT_MDP]: undefined;
  [ROUTE.RESET_PASSWORD]: undefined;
  [ROUTE.ADMIN_DASHBOARD]: undefined;
  [ROUTE.OWNER_DASHBOARD]: undefined;
  [ROUTE.ADMIN_ACCOUNTS]: undefined;
  [ROUTE.ADMIN_ROOMS]: undefined;
  [ROUTE.ADMIN_BOOKING]: undefined;
  [ROUTE.OWNER_ORDERS]: undefined;
};

export type RouteParamList = {
  Home: undefined;
  Login: undefined;
  ForgotPasswordScreen: undefined;
  ForgotMdpScreen: undefined;
  ResetPasswordScreen: undefined;
  AdminAccount: undefined;
  OwnerHome: undefined;
  AdminHome: undefined;
  AdminRooms: undefined;
  AdminBooking : undefined;
  OwnerOrders : undefined;
};

// Typage des propriétés des écrans
export type ScreenProps<T extends keyof RouteParamList> = RouteProps & {
  route: {
    params: RouteParamList[T];
  };
};
