// src/components/atoms/Text/Text.tsx
import React from 'react';
import { Text as RNText, StyleProp, TextStyle } from 'react-native';

export type TextProps = {
  children: string;
  style?: StyleProp<TextStyle>;
};

export const Text: React.FC<TextProps> = ({ children, style }) => {
  return <RNText style={style}>{children}</RNText>;
};
