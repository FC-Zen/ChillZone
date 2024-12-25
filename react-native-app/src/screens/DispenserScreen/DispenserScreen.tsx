import React, { useState } from 'react';
import { View } from 'react-native';
import { SelectedButtonMeal, SearchItem } from '@components/molecules';
import { colors } from '@theme';
import { styles } from './style';

export const DispenserScreen: React.FC = () => {
  const [isSelected, setIsSelected] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string>('Filtrer');

  const handlePress = () => {
    setIsSelected(!isSelected);
  };

  const handleFilterSelect = (option: string) => {
    setSelectedFilter(option);
    console.log('Option sélectionnée :', option);
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

      {/* Ajout du composant SearchItem */}
      <SearchItem
        options={['Menus', 'Plats', 'Boisson', 'Desserts']}
        onSelect={handleFilterSelect}
        initialOption={selectedFilter}
      />
    </View>
  );
};
