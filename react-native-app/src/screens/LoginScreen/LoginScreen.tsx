import { ConnectionTemplate } from '@components';
import React from 'react';
import { View, StyleSheet } from 'react-native';

export const LoginScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <ConnectionTemplate />
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
