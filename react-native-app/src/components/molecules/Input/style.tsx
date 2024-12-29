import { StyleSheet, View, ViewStyle } from 'react-native';
import { FC, ReactNode } from 'react';
import { InputProps } from './Input';
import { colors, typography } from '@theme';

interface InputWrapperProps extends InputProps {
  children: ReactNode;
}

export const InputWrapper: FC<InputWrapperProps> = ({
  style,
  children,
  ...rest
}) => {
  return <View style={[InputStyles.wrapper, style]}>{children}</View>;
};

export const InputIcon = ({ children }: { children: ReactNode }) => {
  return <View style={InputStyles.icon}>{children}</View>;
};

export const InputStyles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    height: 60,
    width: '100%',
    paddingHorizontal: 25,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 15,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.silver,
    backgroundColor: colors.white,
    alignSelf: 'stretch',
  },
  icon: {
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: typography.h4.fontSize,
    fontWeight: '400',
    fontFamily: typography.h4.fontFamily,
  },
  subtitledContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
});
