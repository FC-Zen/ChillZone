import React, { FC, useState } from 'react';
import { StyleProp, TextInput, ViewStyle } from 'react-native';
import { InputWrapper, InputIcon, InputStyles } from './style';
import { Icon, IconProps } from '@components/atoms';
import { colors } from '@theme';

export type InputProps = {
  placeholder: string;
  icon?: IconProps['name'];
  onChangeText: (text: string) => void;
  value: string;
  variant?: 'default' | 'password';
  style?: StyleProp<ViewStyle>;
};

export const Input: FC<InputProps> = ({
  icon,
  onChangeText,
  placeholder,
  value,
  variant = 'default',
  style,
}) => {
  const [isPasswordVisible, setPasswordVisible] = useState(
    variant === 'password'
  );

  return (
    <InputWrapper
      style={style}
      placeholder={placeholder}
      onChangeText={onChangeText}
      value={value}
    >
      {icon && (
        <InputIcon>
          <Icon name={icon} />
        </InputIcon>
      )}{' '}
      {/* Passer l'icône ici */}
      <TextInput
        style={InputStyles.input}
        placeholder={placeholder}
        onChangeText={onChangeText}
        value={value}
        secureTextEntry={isPasswordVisible}
        placeholderTextColor={colors.silver}
      />
    </InputWrapper>
  );
};

export default Input;
