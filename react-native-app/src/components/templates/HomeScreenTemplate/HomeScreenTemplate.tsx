import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Map, RestaurantSlider } from '@components';
import { styles } from './style';
import { NavItem } from '@components/molecules/BookingInfo';
import { IconProps } from '@components/atoms';
import { useTranslation } from 'react-i18next';
import { typography } from '@theme';
import { RestaurantData } from '@services';

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
  restaurantsData: RestaurantData[];
  onPress: (restaurant: RestaurantData) => void;
};

export const HomeScreenTemplate: React.FC<HomeScreenTemplateProps> = ({
  welcomeMessage,
  username,
  items,
  reservationButtonProps,
  restaurantsData,
  onPress,
}) => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        style={styles.scrollView}
      >
        <Text style={styles.headerText}>
          {username ? (
            <>
              {t('userGreeting.hello', { nom: '' })}
              <Text
                style={{
                  fontFamily: typography.h1.fontFamily,
                }}
              >
                {username}
              </Text>
            </>
          ) : (
            ''
          )}
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
