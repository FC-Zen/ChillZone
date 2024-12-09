import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ForgotPasswordTemplate } from '@components';

export const ForgotPasswordScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <ForgotPasswordTemplate />
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
