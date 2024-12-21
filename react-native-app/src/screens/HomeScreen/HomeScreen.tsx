import React from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { TopBar } from '@components/molecules/TopBar';
import { BottomNavbar, Map, RestaurantSlider } from '@components';
import { useUser } from '@contexts/AppContrext';
import { styles } from './style';

export const HomeScreen = () => {
  const username = useUser();
  return (
    <View style={styles.container}>
      <TopBar />
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        style={styles.scrollView}
      >
        <Text style={styles.headerText}>
          Bonjour, <Text style={styles.boldText}>{username.userName}</Text>
        </Text>
        <Map />
        <RestaurantSlider />
      </ScrollView>
      <BottomNavbar />
    </View>
  );
};

export default HomeScreen;
