import React from 'react';
import { View } from 'react-native';
import { VectorHeader, VectorBottom } from '@components';
import { ResetPassword } from '@components/organisms/ResetPassword';
import styles from './style';

export const ResetPasswordTemplate = () => {
  return (
    <View style={styles.container}>
      <VectorHeader />
      <View style={styles.contentContainer}>
        <ResetPassword />
      </View>
      <VectorBottom />
    </View>
  );
};
