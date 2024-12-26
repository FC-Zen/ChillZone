import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  AccountScrenn: undefined;
  Profile: { userId: string };
  Settings: undefined;
};

export type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
