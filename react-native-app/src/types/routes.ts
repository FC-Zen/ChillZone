import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { ROUTE } from '@enums';
import { MealProps } from '@services/DispenserServices';
import { MenuProps } from '@services/MenusServices';
import { NavItem } from '@components/molecules/BookingInfo';

export type RootStackParamList = {
  [ROUTE.HOME]: { userName: string };
  [ROUTE.LOGIN_SCREEN]: undefined;
  [ROUTE.FORGOT_PASSWORD]: undefined;
  [ROUTE.FORGOT_MDP]: undefined;
  [ROUTE.RESET_PASSWORD]: undefined;
  [ROUTE.NOTIFICATION]: undefined;
  [ROUTE.FAQ]: undefined;
  [ROUTE.PAYMENT]: undefined;
  [ROUTE.DISPENSER]: undefined;
  [ROUTE.FINAL_PAYMENT]: undefined;
  [ROUTE.RESERVATION]: undefined;
  [ROUTE.ACCOUNT]: undefined;
  [ROUTE.LINKS]: undefined;
  [ROUTE.DISPENSER_MODAL]: undefined;
  [ROUTE.RESERVATION_SUMMARY]: undefined;
};

// Définition des routes et de leurs paramètres
export type RouteParamList = {
  HomeScreen: {
    data: NavItem[];
  };
  LoginScreen: undefined; // Correspond à ROUTE.LOGIN_SCREEN
  ForgotPasswordScreen: undefined;
  ForgotMdpScreen: undefined;
  ResetPasswordScreen: undefined;
  NotificationScreen: undefined;
  RestaurationScreen: undefined;
  FaqScreen: undefined;
  PaymentScreen: undefined;
  DispenserScreen: undefined;
  DispenserModal: { meal: MealProps };
  MenuModal: { menu: MenuProps };
  FinalPaymentScreen: undefined;
  ReservationScreen: undefined;
  AccountScreen: undefined;
  LinksScreen: undefined;
  ReservationSummaryScreen: undefined;
};

// Typage des propriétés des écrans
export type ScreenProps<T extends keyof RouteParamList> = {
  navigation: StackNavigationProp<RouteParamList, T>;
  route: RouteProp<RouteParamList, T>;
};
