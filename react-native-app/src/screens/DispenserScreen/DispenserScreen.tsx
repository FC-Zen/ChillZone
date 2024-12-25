import React, { useState } from 'react';
import { View } from 'react-native';
import { SelectedButtonMeal } from '@components/molecules';
import { colors } from '@theme';
import { styles } from './style';

export const DispenserScreen = () => {
  const [isSelected, setIsSelected] = useState(false);

  const handlePress = () => {
    setIsSelected(!isSelected);
  };

  const color = isSelected ? colors.aquaDeep : colors.darkCyan;

  return (
    <View style={styles.container}>
      <SelectedButtonMeal
        title="Plats"
        isSelected={isSelected}
        onPress={handlePress}
        color={color}
      />
    </View>
  );
};
