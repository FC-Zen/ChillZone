import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TopBar } from '@components/molecules/TopBar';
import { BottomNavbar } from '@components';

export const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <TopBar />
      <BottomNavbar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default HomeScreen;
