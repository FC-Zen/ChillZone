import React from 'react';
import { StyleProp, ViewStyle, TextStyle } from 'react-native';
import { ButtonWrapper } from './style';
import { IconProps } from '@components/atoms';
import { colors, typography } from '@theme';

export type ButtonProps = {
  title: string;
  onPress?: () => void | false;
  variant?: 'primary' | 'secondary' | 'icon' | 'news' | 'iconOnly'; // Ajout du variant icon et news
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>; // Nouvelle propriété
  icon?: IconProps;
  color?: string;
  textColor?: string;
  textSize?: number;
  textFont?: string;
  disabled?: boolean;
};

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  style,
  textStyle,
  icon,
  color,
  textColor = colors.white,
  textSize = typography.h3.fontSize,
  textFont = typography.h1.fontFamily,
  disabled = false,
}) => {
  const handlePress = () => {
    if (!disabled && onPress) {
      onPress();
    } else {
      return;
    }
  };

  return (
    <ButtonWrapper
      title={variant === 'iconOnly' ? '' : title}
      onPress={handlePress}
      variant={variant}
      style={[
        style,
        disabled && {
          opacity: 0.5,
        },
      ]}
      textStyle={textStyle}
      icon={icon}
      color={color}
      textColor={disabled ? colors.black : textColor}
      textSize={textSize}
      textFont={textFont}
      disabled={disabled}
    />
  );
};
