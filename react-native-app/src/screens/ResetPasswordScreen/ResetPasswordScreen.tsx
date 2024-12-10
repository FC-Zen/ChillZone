import { ResetPasswordTemplate } from '@components';
import React from 'react';
import { View, StyleSheet } from 'react-native';

export const ResetPasswordScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <ResetPasswordTemplate />
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
