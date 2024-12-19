import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Icon, IconProps } from '@components/atoms';
import { styles } from './style';
import { colors } from '@theme';

export type NavItem = {
  name: string;
  icon: IconProps['name'];
  label: string;
};

export const BottomNavbar = () => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const items: NavItem[] = [
    { name: 'Home', icon: 'Home', label: 'Accueil' },
    { name: 'Reserve', icon: 'Cube', label: 'Réserver' },
    { name: 'Lunch', icon: 'Bag', label: 'Déjeuner' },
    { name: 'Calendar', icon: 'Calendar', label: 'Calendrier' },
    { name: 'Navigation', icon: 'Map', label: 'Navigation' },
  ];

  const handlePress = (name: string) => {
    setSelectedItem(name);
  };

  return (
    <View style={styles.container}>
      {items.map((item) => (
        <TouchableOpacity
          key={item.name}
          style={styles.itemContainer}
          onPress={() => handlePress(item.name)}
        >
          <Icon
            name={item.icon}
            style={styles.icon}
            color={selectedItem === item.name ? colors.white : colors.silver}
          />
          <Text style={styles.label}>{item.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};
