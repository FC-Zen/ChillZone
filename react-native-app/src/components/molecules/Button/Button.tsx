import React from 'react';
import { StyleProp, ViewStyle, TextStyle } from 'react-native';
import { ButtonWrapper } from './style';
import { IconProps } from '@components/atoms';
import { colors, typography } from '@theme';

export type ButtonProps = {
  id?: string;
  testID?: string;
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
};

export const Button: React.FC<ButtonProps> = ({
  id,
  testID,
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
}) => {
  return (
    <ButtonWrapper
      id={id}
      testID={testID}
      title={variant === 'iconOnly' ? '' : title}
      onPress={onPress}
      variant={variant}
      style={style}
      textStyle={textStyle}
      icon={icon}
      color={color}
      textColor={textColor}
      textSize={textSize}
      textFont={textFont}
    />
  );
};
