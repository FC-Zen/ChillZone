import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { styles } from './style';
import { MapFloorProps } from '@services';

type NavBarProps = {
  onSelectFloor: (floor: number) => void;
  selectedFloor: string;
  floors: MapFloorProps[];
};

export const NavigationBar: React.FC<NavBarProps> = ({
  onSelectFloor,
  selectedFloor,
  floors,
}) => {
  return (
    <View style={[styles.navBar, styles.navBarBottom]}>
      {floors.map((floor) => (
        <TouchableOpacity
          key={floor.id}
          onPress={() => onSelectFloor(floor.id)}
        >
          <Text
            style={[
              styles.navItem,
              selectedFloor === floor.name && styles.active,
            ]}
          >
            {floor.name === 'Rez-De-Chaussée' ? 'RDC' : floor.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};
