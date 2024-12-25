import { colors, typography } from '@theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    display: 'flex',
    minHeight: 53,
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    width: 150,
  },
  title: {
    fontSize: 20,
    fontFamily: typography.h1.fontFamily,
    color: colors.aquaDeep,
  },
  bar: {
    height: 3,
    width: '100%',
    backgroundColor: colors.aquaDeep,
  },
});
