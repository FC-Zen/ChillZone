import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './style';

export type SelectedButtonMealProps = {
  title: string;
  isSelected: boolean;
  onPress: () => void;
  color: string;
};

export const SelectedButtonMeal: React.FC<SelectedButtonMealProps> = ({
  title,
  isSelected,
  onPress,
  color,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={[styles.title, { color }]}>{title}</Text>
      <View style={[styles.bar, { backgroundColor: color }]} />
    </TouchableOpacity>
  );
};
