import React from 'react';
import { View, Text } from 'react-native';
import { VectorHeader, VectorBottom } from '@components';
import { ForgotPassword } from '@components/organisms';
import styles from './style';

export const ForgotPasswordTemplate = () => {
  return (
    <View style={styles.container}>
      <VectorHeader />
      <View style={styles.contentContainer}>
        <ForgotPassword />
      </View>
      <VectorBottom />
    </View>
  );
};
