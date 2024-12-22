import React from 'react';
import { View, Text, Image } from 'react-native';
import { Icon, IconProps } from '@components/atoms';
import { styles } from './style';
import { colors } from '@theme';
import { map } from '@assets/Images';

type NavItem = {
  icon: IconProps['name'];
  label: string;
};

export const BookingInfo: React.FC = () => {
  const items: NavItem[] = [
    { icon: 'Cube', label: 'Salle 001' },
    { icon: 'Calendar', label: '10/10/24' },
    { icon: 'Clock', label: '12H00' },
    { icon: 'Marker', label: 'IUT Champs sur Marne' },
    { icon: 'HomeLocation', label: 'Étage 1' },
  ];

  return (
    <View style={styles.container}>
      <Image source={map} style={styles.image} />
      <View style={styles.content}>
        <View style={styles.iconRow}>
          {items.map((item, index) => (
            <View key={index} style={styles.iconContainer}>
              <View style={styles.iconLabelContainer}>
                <Icon
                  name={item.icon}
                  color={colors.white}
                  height={16}
                  width={16}
                />
                <Text style={styles.iconText}>{item.label}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};
