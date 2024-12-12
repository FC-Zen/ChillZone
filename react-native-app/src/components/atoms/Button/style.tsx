import React, { FC } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors, layout, typography } from '@theme/index';
import { ButtonProps } from './Button';
import { fonts } from '@theme/typography';

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
    zIndex: 10,
  },
  text: {
    color: colors.white,
    textAlign: 'center',
    fontSize: typography.h3.fontSize,
    fontFamily: fonts.semiBold,
  },
});

export default ButtonWrapper;
