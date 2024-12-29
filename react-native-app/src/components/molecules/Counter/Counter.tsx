import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Icon } from '@components/atoms';
import { styles } from './style';

type CounterProps = {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
};

export const Counter: React.FC<CounterProps> = ({
  quantity,
  onIncrement,
  onDecrement,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button}>
        <Icon name="Less" onPress={onDecrement} />
      </TouchableOpacity>
      <Text style={styles.quantity}>{quantity}</Text>
      <TouchableOpacity style={styles.button}>
        <Icon name="More" onPress={onIncrement} />
      </TouchableOpacity>
    </View>
  );
};
