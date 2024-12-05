import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { ButtonWrapper } from './style';

export type ButtonProps = {
  title: string;
  onPress: () => void | false;
  variant?: 'primary' | 'secondary';
  style?: StyleProp<ViewStyle>;
};

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  style,
}) => {
  return (
    <ButtonWrapper
      title={title}
      onPress={onPress}
      variant={variant}
      style={style}
    />
  );
};

export default Button;
