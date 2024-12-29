import React, { FC, useState } from 'react';
import { StyleProp, TextInput, View, ViewStyle, Text } from 'react-native';
import { InputWrapper, InputIcon, InputStyles } from './style';
import { Icon, IconProps } from '@components/atoms';
import { colors } from '@theme';

export type InputProps = {
  placeholder: string;
  icon?: IconProps['name'];
  onChangeText: (text: string) => void;
  value: string;
  variant?: 'default' | 'password' | 'subtitled' | 'search';
  style?: StyleProp<ViewStyle>;
  subtitle?: string;
  subtitleColor?: string;
  textSize?: number;
  data?: string[];
  onFilter?: (filteredData: string) => void; // Pour le filtrage
};

export const Input: FC<InputProps> = ({
  icon,
  onChangeText,
  placeholder,
  value,
  variant = 'default',
  style,
  subtitle = '',
  subtitleColor,
  textSize,
  onFilter,
}) => {
  const [isPasswordVisible, setPasswordVisible] = useState(
    variant === 'password'
  );

  const handleChange = (text: string) => {
    onChangeText(text);
    if (onFilter) {
      onFilter(text);
    }
  };

  return (
    <View
      style={
        variant === 'subtitled' && subtitle !== ''
          ? InputStyles.subtitledContainer
          : {}
      }
    >
      <InputWrapper
        style={style}
        placeholder={placeholder}
        onChangeText={handleChange}
        value={value}
      >
        {icon && (
          <InputIcon>
            <Icon name={icon} />
          </InputIcon>
        )}
        <TextInput
          style={[InputStyles.input, textSize ? { fontSize: textSize } : {}]}
          placeholder={placeholder}
          onChangeText={handleChange}
          value={value}
          secureTextEntry={isPasswordVisible}
          placeholderTextColor={colors.silver}
        />
      </InputWrapper>
      {variant === 'subtitled' && subtitle !== '' && (
        <Text style={{ color: subtitleColor }}>{subtitle}</Text>
      )}
    </View>
  );
};

export default Input;
