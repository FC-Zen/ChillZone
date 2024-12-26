import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { ProfileHeader } from '@components/molecules/ProfileHeader';
import { AccountOptionsList } from '@components/organisms/AccountOptionsList';
import { ToggleSwitch } from '@components/atoms/ToggleSwitch';
import { PageHeader } from '@components/molecules/PageHeader';

export type AccountTemplateProps = {};

export const AccountTemplate: React.FC = () => (
  <ScrollView contentContainerStyle={styles.container}>
    <PageHeader title="Mon compte" variant="default" />
    <ProfileHeader name="Kellian BREDEAU" />
    <AccountOptionsList />
  </ScrollView>
);

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff' },
});
