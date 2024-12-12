import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
<<<<<<< HEAD
import { LoginScreen, NotificationScreen } from '@screens';
=======
import {
  ForgotMdpScreen,
  ForgotPasswordScreen,
  LoginScreen,
  ResetPasswordScreen,
} from '@screens';
import { ROUTE } from '@enums';
>>>>>>> 879dbcff550c53566b0fc529324b131c0f7ee84a

const Stack = createNativeStackNavigator();

export const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
<<<<<<< HEAD
          name="Notification"
          component={NotificationScreen}
=======
          name={ROUTE.LOGIN_SCREEN}
          component={LoginScreen}
>>>>>>> 879dbcff550c53566b0fc529324b131c0f7ee84a
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};
