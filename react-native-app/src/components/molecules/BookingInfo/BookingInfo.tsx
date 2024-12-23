import React from 'react';
import { View, Text, Image } from 'react-native';
import { Icon, IconProps } from '@components/atoms';
import { styles } from './style';
import { colors } from '@theme';
import { map } from '@assets/Images';

export type NavItem = {
  icon: IconProps['name'];
  label: string;
};

type BookingInfoProps = {
  items: NavItem[];
};

export const BookingInfo: React.FC<BookingInfoProps> = ({ items }) => {
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
