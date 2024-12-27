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
  variant?: 'default' | 'password' | 'subtitled';
  style?: StyleProp<ViewStyle>;
  subtitle?: string;
  subtitleColor?: string;
  textSize?: number;
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
}) => {
  const [isPasswordVisible, setPasswordVisible] = useState(
    variant === 'password'
  );

  return (
    <View style={variant === 'subtitled' && subtitle !== '' ? InputStyles.subtitledContainer : {}}>
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
          style={[InputStyles.input, textSize ? {fontSize: textSize}: {}]}
          placeholder={placeholder}
          onChangeText={onChangeText}
          value={value}
          secureTextEntry={isPasswordVisible}
          placeholderTextColor={colors.silver}
        />
      </InputWrapper>
      {variant === 'subtitled' && subtitle !== '' && <Text style={{color: subtitleColor}} >{subtitle}</Text>}
    </View>
  );
};

export default Input;
