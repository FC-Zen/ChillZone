import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { Icon, IconProps } from '@components/atoms';
import { styles } from './style';
import { colors } from '@theme';

type SearchItemProps = {
  options: string[];
  onSelect: (option: string) => void;
  initialOption?: string;
  iconName?: IconProps['name'];
};

export const SearchItem: React.FC<SearchItemProps> = ({
  options,
  onSelect,
  initialOption = 'Filtrer',
}) => {
  const [currentOption, setCurrentOption] = useState<string>(initialOption);
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);

  const handleSelect = (option: string) => {
    setCurrentOption(option);
    setIsDropdownVisible(false);
    onSelect(option);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => setIsDropdownVisible((prev) => !prev)}
      >
        <Text style={styles.dropdownText}>{currentOption}</Text>
        <Icon name="CarretUp" color={colors.silver} style={styles.icon} />
      </TouchableOpacity>

      {isDropdownVisible && (
        <View style={styles.dropdownList}>
          <FlatList
            data={options}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.option}
                onPress={() => handleSelect(item)}
              >
                <Text style={styles.optionText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
};
