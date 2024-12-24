import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Map, RestaurantSlider } from '@components';
import { styles } from './style';
import { NavItem } from '@components/molecules/BookingInfo';
import { IconProps } from '@components/atoms';

type ReservationButtonProps = {
  title: string;
  onPress: () => void;
  iconName: IconProps['name'];
};

export type HomeScreenTemplateProps = {
  welcomeMessage: string[];
  username: string | null;
  items: NavItem[];
  reservationButtonProps: ReservationButtonProps;
  restaurantsData: {
    id: number;
    name: string;
    photo_link: any;
    status: 'Ouvert' | 'Fermé';
  }[];
  onPress: (restaurantName: string) => void;
};

export const HomeScreenTemplate: React.FC<HomeScreenTemplateProps> = ({
  welcomeMessage,
  username,
  items,
  reservationButtonProps,
  restaurantsData,
  onPress,
}) => {
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        style={styles.scrollView}
      >
        <Text style={styles.headerText}>
          {username && `Bonjour, ${username}`}
        </Text>
        <Map items={items} reservationButtonProps={reservationButtonProps} />
        <RestaurantSlider
          restaurantWords={welcomeMessage}
          restaurantsData={restaurantsData}
          onPress={onPress}
        />
      </ScrollView>
    </View>
  );
};
