import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  ForgotMdpScreen,
  ForgotPasswordScreen,
  LoginScreen,
  ResetPasswordScreen,
  NotificationScreen,
  HomeScreen,
  RestaurationScreen,
  FaqScreen
} from '@screens';
import { ROUTE } from '@enums';
import { UserProvider } from '@contexts/AppContrext';

const Stack = createNativeStackNavigator();

export const RootNavigator = () => {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name={ROUTE.LOGIN_SCREEN}
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={ROUTE.FORGOT_PASSWORD}
            component={ForgotPasswordScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={ROUTE.FORGOT_MDP}
            component={ForgotMdpScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={ROUTE.RESET_PASSWORD}
            component={ResetPasswordScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={ROUTE.HOME}
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={ROUTE.NOTIFICATION}
            component={NotificationScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={ROUTE.RESTAURATION}
            component={RestaurationScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={ROUTE.FAQ}
            component={FaqScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
};
