import React, { useState, useEffect, useRef } from 'react';
import { Animated, View, StyleSheet, ActivityIndicator } from 'react-native';
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
  FaqScreen,
  PaymentScreen,
  DispenserScreen,
  DispenserModal,
  FinalPaymentScreen,
  ReservationScreen,
  AccountScreen,
  LinksScreen,

} from '@screens';
import { ROUTE } from '@enums';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NextBookingProvider, UserProvider } from '@contexts/AppContrext';
import { colors } from '@theme';
import { Bounce } from 'react-native-animated-spinkit';

const Stack = createNativeStackNavigator();

export const RootNavigator = () => {
  const [isLoading, setIsLoading] = useState(true);
  const opacityAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const timer = setTimeout(() => {
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        setIsLoading(false);
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, [opacityAnim]);

  if (isLoading) {
    return (
      <SafeAreaProvider>
        <View style={styles.loadingContainer}>
          <Animated.View style={[styles.loader, { opacity: opacityAnim }]}>
            <Bounce size={150} color={colors.darkCyan} />
          </Animated.View>
        </View>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
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
            <Stack.Screen
              name={ROUTE.DISPENSER}
              component={DispenserScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name={ROUTE.DISPENSER_MODAL}
              component={DispenserModal}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name={ROUTE.PAYMENT}
              component={PaymentScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name={ROUTE.FINAL_PAYMENT}
              component={FinalPaymentScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name={ROUTE.LINKS}
              component={LinksScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name={ROUTE.RESERVATION}
              component={ReservationScreen}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </UserProvider>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  loader: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
