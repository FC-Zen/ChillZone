import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ForgotMdpTemplate } from '@components';

export const ForgotMdpScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <ForgotMdpTemplate />
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
