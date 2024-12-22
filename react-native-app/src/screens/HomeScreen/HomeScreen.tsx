import React from 'react';
import { View } from 'react-native';
import { TopBar } from '@components/molecules/TopBar';
import { BottomNavbar } from '@components/molecules/BottomNavbar';
import { useUser } from '@contexts/AppContrext';
import { HomeScreenTemplate } from '@components';
import { useNavigation } from '@react-navigation/native';
import { styles } from './style';

export const HomeScreen = () => {
  const navigation = useNavigation();
  const { userName } = useUser();

  const handleUserPress = () => {
    console.log('on navigue');
    // navigation.navigate();
  };

  const handleFaqPress = () => {
    console.log('on navigue');
    // navigation.navigate();
  };

  const handleNotificationPress = () => {
    console.log('on navigue');
    // navigation.navigate();
  };

  return (
    <View style={styles.container}>
      <TopBar
        onUserPress={handleUserPress}
        onFaqPress={handleFaqPress}
        onNotificationPress={handleNotificationPress}
      />
      <HomeScreenTemplate username={userName} />
      <BottomNavbar />
    </View>
  );
};

export default HomeScreen;
