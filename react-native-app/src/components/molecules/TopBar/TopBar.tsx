import { Icon } from '@components/atoms';
import React from 'react';
import { View } from 'react-native';
import { styles } from './style';

export const TopBar = () => {
  return (
    <View style={styles.header}>
      <View style={styles.container}>
        <Icon name="UserCircle" style={styles.icon} />
        <View style={styles.rightIcons}>
          <Icon name="FaqQuestion" style={styles.icon} />
          <View style={styles.spacing} />
          <Icon name="Notification" style={styles.icon} />
        </View>
      </View>
    </View>
  );
};
