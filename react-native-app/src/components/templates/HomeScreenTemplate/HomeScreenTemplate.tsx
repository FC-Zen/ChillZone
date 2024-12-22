import React from 'react';
import { View, ScrollView, Text } from 'react-native';
import { Map, RestaurantSlider } from '@components';
import { styles } from './style';

type HomeScreenTemplateProps = {
  username: string | null;
};

export const HomeScreenTemplate: React.FC<HomeScreenTemplateProps> = ({
  username,
}) => {
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        style={styles.scrollView}
      >
        <Text style={styles.headerText}>
          Bonjour, <Text style={styles.boldText}>{username}</Text>
        </Text>
        <Map />
        <RestaurantSlider />
      </ScrollView>
    </View>
  );
};
