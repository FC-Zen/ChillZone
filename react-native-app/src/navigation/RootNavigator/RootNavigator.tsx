import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  ForgotMdpScreen,
  ForgotPasswordScreen,
  LoginScreen,
  ResetPasswordScreen,
  NotificationScreen,
} from '@screens';
import { ROUTE } from '@enums';

const Stack = createNativeStackNavigator();

export const RootNavigator = () => {
  return (
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
          name={ROUTE.NOTIFICATION}
          component={NotificationScreen}
          options={{ headerShown: false }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
};
