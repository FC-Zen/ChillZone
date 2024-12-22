import { colors, layout, typography } from '@theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: 44,
    paddingVertical: 5,
    borderRadius: 10,
    backgroundColor: colors.warn,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  text: {
    color: colors.white,
    textAlign: 'center',
    fontSize: typography.h3.fontSize,
    fontFamily: typography.h3.fontFamily,
  },
});
