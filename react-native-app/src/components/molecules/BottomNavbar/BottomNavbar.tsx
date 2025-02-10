import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Icon, IconProps } from '@components/atoms';
import { styles } from './style';
import { colors } from '@theme';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { ROUTE } from '@enums';

type RootStackParamList = {
  HomeScreen: undefined;
  ReserveScreen: undefined;
  LunchScreen: undefined;
  CalendarScreen: undefined;
  NavigationScreen: undefined;
  RestaurationScreen: undefined;
  ReservationScreen: undefined;
};

export type NavItem = {
  name: string;
  icon: IconProps['name'];
  label: string;
};

type BottomNavbarProps = {
  activeIcon: string;
};

export const BottomNavbar: React.FC<BottomNavbarProps> = ({ activeIcon }) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [selectedItem, setSelectedItem] = useState<string | null>(activeIcon);

  const items: NavItem[] = [
    { name: 'Home', icon: 'Home', label: 'Accueil' },
    { name: 'Reserve', icon: 'Cube', label: 'Réserver' },
    { name: 'Lunch', icon: 'Bag', label: 'Déjeuner' },
    { name: 'Calendar', icon: 'Calendar', label: 'Calendrier' },
    { name: 'Navigation', icon: 'Map', label: 'Navigation' },
  ];

  const handlePress = (name: string) => {
    setSelectedItem(name);

    switch (name) {
      case 'Home':
        console.log('Home');
        navigation.navigate(ROUTE.HOME);
        break;
      case 'Reserve':
        console.log('Reserve');
        navigation.navigate(ROUTE.RESERVATION);
        break;
      case 'Lunch':
        console.log('Lunch');
        navigation.navigate(ROUTE.RESTAURATION);
        break;
      case 'Calendar':
        console.log('Calendar');
        navigation.navigate(ROUTE.CALENDAR);
        break;
      case 'Navigation':
        console.log('Navigation');
        // navigation.navigate(ROUTE.NAVIGATION);
        break;
      default:
        break;
    }
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
            onPress={() => handlePress(item.name)}
            style={styles.icon}
            color={selectedItem === item.name ? colors.white : colors.silver}
          />
          <Text style={styles.label}>{item.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};
