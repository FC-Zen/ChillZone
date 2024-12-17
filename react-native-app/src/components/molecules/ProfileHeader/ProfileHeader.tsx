import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '@components/atoms/Text';

export type ProfileHeaderProps = {
  name: string;
};

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ name }) => (
  <View style={styles.container}>
    <View style={styles.avatar} />
    <Text style={styles.name}>{name}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { alignItems: 'center', marginVertical: 20 },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#512D6D',
  },
  name: { fontSize: 18, fontWeight: 'bold', marginTop: 10 },
});
