import React, { useState } from 'react';
import { View, TextInput, TextInputProps } from 'react-native';
import { styles } from './style';
import { Icon, IconProps } from '@components/atoms';
import { colors } from '@theme';

export type FieldProps = {
  data: string[];
  onFilter: (filteredData: string) => void;
  iconName: IconProps['name'];
  placeholder?: string;
} & TextInputProps;

export const Field: React.FC<FieldProps> = ({
  data,
  onFilter,
  iconName,
  placeholder,
  ...textInputProps
}) => {
  const [searchText, setSearchText] = useState<string>('');
  const handleChange = (text: string) => {
    setSearchText(text);
    onFilter(text);
  };

  return (
    <View style={styles.container}>
      <Icon name={iconName} color={colors.silver} />
      <TextInput
        style={styles.input}
        value={searchText}
        onChangeText={handleChange}
        placeholder={placeholder}
        placeholderTextColor={colors.silver}
        {...textInputProps}
      />
    </View>
  );
};
