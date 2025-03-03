import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { ROUTE } from '@enums';
import { MealProps } from '@services/DispenserServices';
import { MenuProps } from '@services/MenusServices';
import { RestaurantData } from '@services';

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
  [ROUTE.CART]: undefined;
  [ROUTE.ALERT]: undefined;
  [ROUTE.COMMAND_SUMMARY]: undefined;
  [ROUTE.CALENDAR]: undefined;
  [ROUTE.NAVIGATION]: undefined;
  [ROUTE.AR_NAVIGATION]: undefined;
};

// Définition des routes et de leurs paramètres
export type RouteParamList = {
  HomeScreen: undefined;
  LoginScreen: undefined; // Correspond à ROUTE.LOGIN_SCREEN
  ForgotPasswordScreen: undefined;
  ForgotMdpScreen: undefined;
  ResetPasswordScreen: undefined;
  NotificationScreen: undefined;
  RestaurationScreen: undefined;
  FaqScreen: undefined;
  PaymentScreen: { qrcode: string };
  DispenserScreen: {
    restaurantId?: RestaurantData['id'];
    restaurantName?: RestaurantData['name'];
  };
  DispenserModal: { meal: MealProps };
  MenuModal: { menu: MenuProps };
  FinalPaymentScreen: { qrcode: string };
  ReservationScreen: undefined;
  AccountScreen: undefined;
  LinksScreen: undefined;
  ReservationSummaryScreen: undefined;
  CartScreen: { restaurantId?: RestaurantData['id'] };
  AlertScreen: undefined;
  CommandSummaryScreen: undefined;
  CalendarScreen: undefined;
  NavigationScreen: undefined;
  ARNavigationScreen: undefined;
};

// Typage des propriétés des écrans
export type ScreenProps<T extends keyof RouteParamList> = {
  navigation: StackNavigationProp<RouteParamList, T>;
  route: RouteProp<RouteParamList, T>;
};
