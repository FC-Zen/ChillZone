import React from 'react';
import { View, ScrollView, Text } from 'react-native';
import { Map, RestaurantSlider } from '@components';
import { styles } from './style';
import { useTranslation } from 'react-i18next';

type HomeScreenTemplateProps = {
  username: string | null;
};

export const HomeScreenTemplate: React.FC<HomeScreenTemplateProps> = ({
  username,
}) => {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        style={styles.scrollView}
      >
        <Text style={styles.headerText}>
          {t('userGreeting.hello', { nom: '' })}
          <Text style={styles.boldText}>{username}</Text>
        </Text>
        <Map />
        <RestaurantSlider />
      </ScrollView>
    </View>
  );
};
