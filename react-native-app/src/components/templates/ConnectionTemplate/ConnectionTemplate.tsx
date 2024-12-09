import React from 'react';
import { View } from 'react-native';
import { VectorHeader, VectorBottom } from '@components';
import { Connection } from '@components/organisms/Connection';
import styles from './style';

export const ConnectionTemplate = () => {
  return (
    <View style={styles.container}>
      <VectorHeader />
      <View style={styles.contentContainer}>
        <Connection />
      </View>
      <VectorBottom />
    </View>
  );
};
