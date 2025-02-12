import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { styles } from './style';
import { useTranslation } from 'react-i18next';

type NavBarProps = {
  onSelectFloor: (floor: string) => void;
  selectedFloor: string;
  floors: string[];
};

export const NavigationBar: React.FC<NavBarProps> = ({
  onSelectFloor,
  selectedFloor,
  floors,
}) => {
  const { t } = useTranslation();

  return (
    <View style={[styles.navBar, styles.navBarBottom]}>
      {floors.map((floor, index) => (
        <TouchableOpacity key={index} onPress={() => onSelectFloor(floor)}>
          <Text
            style={[styles.navItem, selectedFloor === floor && styles.active]}
          >
            {floor === 'RDC'
              ? t('rooms.baseFloor')
              : t('rooms.floor', { x: index })}{' '}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};
