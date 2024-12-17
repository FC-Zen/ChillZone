import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { AccountTemplate } from '@components/templates/AccountTemplate';

export type AccountScreenProps = {};

export const AccountScreen: React.FC = () => (
  <SafeAreaView style={styles.container}>
    <AccountTemplate />
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
});
