import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { styles } from './style';

type NavBarProps = {
  onSelectFloor: (floor: string) => void;
  selectedFloor: string;
};

export const NavigationBar: React.FC<NavBarProps> = ({
  onSelectFloor,
  selectedFloor,
}) => {
  return (
    <View style={[styles.navBar, styles.navBarBottom]}>
      {['RDC', 'Etage 1', 'Etage 2', 'Etage 3'].map((floor, index) => (
        <TouchableOpacity key={index} onPress={() => onSelectFloor(floor)}>
          <Text
            style={[styles.navItem, selectedFloor === floor && styles.active]}
          >
            {floor}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};
