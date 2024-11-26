import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { UserCard } from '@components/molecules/UserCard';
import { Button } from '@components/atoms';

export const UsersScreen: React.FC = () => {
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Button
          title="Add User"
          onPress={() => console.log('Add user')}
        />
      </View>
      <ScrollView style={styles.list}>
        {users.map(user => (
          <UserCard
            key={user.id}
            name={user.name}
            email={user.email}
            onEdit={() => console.log('Edit user:', user.id)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    padding: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  list: {
    padding: 16,
  },
});