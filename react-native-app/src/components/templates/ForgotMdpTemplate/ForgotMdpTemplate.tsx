import React from 'react';
import { View, Text } from 'react-native';
import { VectorHeader, VectorBottom } from '@components';
import { ForgotMdp } from '@components/organisms';
import styles from './style';

export const ForgotMdpTemplate = () => {
  return (
    <View style={styles.container}>
      <VectorHeader />
      <View style={styles.contentContainer}>
        <ForgotMdp />
      </View>
      <VectorBottom />
    </View>
  );
};
