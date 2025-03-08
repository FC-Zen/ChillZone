import { Icon } from '@components/atoms';
import React from 'react';
import { View } from 'react-native';
import { styles } from './style';
import { ROUTE } from '@enums';
import { useNavigation } from '@hooks';

export const TopBar = () => {
  const navigation = useNavigation();

  const handleUserPress = () => {
    navigation.navigate(ROUTE.ACCOUNT);
  };

  const handleFaqPress = () => {
    navigation.navigate(ROUTE.FAQ);
  };

  const handleNotificationPress = () => {
    navigation.navigate(ROUTE.NOTIFICATION);
  };
  return (
    <View style={styles.header}>
      <View style={styles.container}>
        <Icon name="UserCircle" style={styles.icon} onPress={handleUserPress} />
        <View style={styles.rightIcons}>
          <Icon
            name="FaqQuestion"
            style={styles.icon}
            onPress={handleFaqPress}
          />
          <View style={styles.spacing} />
          <Icon
            name="Notification"
            style={styles.icon}
            onPress={handleNotificationPress}
          />
        </View>
      </View>
    </View>
  );
};
