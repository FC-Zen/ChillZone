import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from '@components/index';

export const LoginScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.list}>
        <Button variant="primary" title="Se connecter" onPress={() => {}} />
      </View>
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
