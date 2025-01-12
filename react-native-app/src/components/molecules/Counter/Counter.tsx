import React from 'react';
import { View, Text, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import { Icon } from '@components/atoms';
import { styles } from './style';
import { typography } from '@theme';

type CounterProps = {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
  onDelete?: () => void;
  variant?: 'default' | 'small';
};

export const Counter: React.FC<CounterProps> = ({
  quantity,
  onIncrement,
  onDecrement,
  onDelete,
  variant = 'default',
}) => {
  return (
    <View style={[styles.container, variant === 'small' && { width: 80, paddingHorizontal: 0, height: 28 }]}>
      <TouchableOpacity style={styles.button}>
        { variant === 'small' && quantity <= 1 ? 
        <Icon name="Trash" onPress={onDelete} /> 
        : <Icon name="Less" onPress={onDecrement} />}
      </TouchableOpacity>
      <Text style={[styles.quantity, variant === 'small' && { fontSize: 13, fontFamily: typography.title1.fontFamily }]}>{quantity}</Text>
      <TouchableOpacity style={styles.button}>
        <Icon name="More" onPress={onIncrement} />
      </TouchableOpacity>
    </View>
  );
};
