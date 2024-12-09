import { Input } from '@components';
import React from 'react';
import { View, StyleSheet } from 'react-native';

export const ForgotPasswordScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Input
        icon="User"
        placeholder="Email"
        variant="default"
        onChangeText={() => {}}
        value=""
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    padding: 16,
  },
});
