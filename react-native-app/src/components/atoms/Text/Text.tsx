// src/components/atoms/Text/Text.tsx
import React from 'react';
import { Text as RNText, StyleProp, TextStyle } from 'react-native';

interface TextProps {
  children: string;
  style?: StyleProp<TextStyle>;
}

const Text: React.FC<TextProps> = ({ children, style }) => {
  return <RNText style={style}>{children}</RNText>;
};

export default Text;
