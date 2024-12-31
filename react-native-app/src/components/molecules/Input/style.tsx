import { StyleSheet, View, ViewStyle } from 'react-native';
import { FC, ReactNode } from 'react';
import { InputProps } from './Input';
import { colors, typography } from '@theme';
interface InputWrapperProps extends InputProps {
  children: ReactNode;
}
export const InputWrapper: FC<InputWrapperProps> = ({ style, children }) => {
  return <View style={[InputStyles.wrapper, style]}>{children}</View>;
};
export const InputIcon = ({ children }: { children: ReactNode }) => {
  return <View style={InputStyles.icon}>{children}</View>;
};
export const InputStyles = StyleSheet.create({
  container: {
    width: '100%',
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    height: 60,
    width: '100%',
    paddingHorizontal: 25,
    alignItems: 'center',
    justifyContent: 'space-between',
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
  subIcon: {
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: typography.h3.fontSize,
    fontWeight: '400',
    fontFamily: typography.h3.fontFamily,
  },
  selectInput: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subtitledContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  dropdown: {
    marginTop: 10,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.silver,
    borderRadius: 10,
    zIndex: 1000,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  dropdownRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  dropdownItem: {
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dropdownText: {
    fontSize: typography.h3.fontSize,
    fontFamily: typography.h3.fontFamily,
    color: colors.resolutionBlue,
  },
});
