import { Icon } from '@components/atoms';
import React from 'react';
import { View, GestureResponderEvent } from 'react-native';
import { styles } from './style';

type TopBarProps = {
  onUserPress: () => void;
  onFaqPress: () => void;
  onNotificationPress: () => void;
};

export const TopBar: React.FC<TopBarProps> = ({
  onUserPress,
  onFaqPress,
  onNotificationPress,
}) => {
  return (
    <View style={styles.header}>
      <View style={styles.container}>
        <Icon name="UserCircle" style={styles.icon} onPress={onUserPress} />
        <View style={styles.rightIcons}>
          <Icon name="FaqQuestion" style={styles.icon} onPress={onFaqPress} />
          <View style={styles.spacing} />
          <Icon
            name="Notification"
            style={styles.icon}
            onPress={onNotificationPress}
          />
        </View>
      </View>
    </View>
  );
};
