import React, { FC } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors, layout, typography } from '@theme/index';
import { ButtonProps } from './Button';

export const ButtonWrapper: FC<ButtonProps> = ({
  variant,
  style,
  onPress,
  title,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress || undefined}
      style={[
        styles.button,
        variant === 'primary' && { backgroundColor: colors.resolutionBlue },
        variant === 'secondary' && { backgroundColor: colors.white },
        style,
      ]}
    >
      <Text style={styles.text}>{title}</Text>{' '}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    display: 'flex',
    paddingVertical: 12,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: layout.radius.xxxl,
    borderWidth: layout.size['0'],
    borderColor: colors.white,
    height: 50,
    width: '100%',
  },
  text: {
    color: colors.white,
    textAlign: 'center',
    fontSize: typography.h3.fontSize,
  },
});

export default ButtonWrapper;
