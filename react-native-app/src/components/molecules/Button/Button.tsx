import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { ButtonWrapper } from './style';
import { IconProps } from '@components/atoms';
import { colors } from '@theme';

export type ButtonProps = {
  title: string;
  onPress: () => void | false;
  variant?: 'primary' | 'secondary' | 'icon';
  style?: StyleProp<ViewStyle>;
  icon?: IconProps;
  color?: string;
  textColor?: string;
};

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  style,
  icon,
  color,
  textColor = colors.white,
}) => {
  return (
    <ButtonWrapper
      title={title}
      onPress={onPress}
      variant={variant}
      style={style}
      icon={icon}
      color={color}
      textColor={textColor}
    />
  );
};
