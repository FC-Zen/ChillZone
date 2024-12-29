import { colors, typography } from '@theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    width: 130,
    height: 40,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.silver,
    backgroundColor: colors.white,
    paddingHorizontal: 10,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantity: {
    fontSize: 20,
    fontFamily: typography.h2.fontFamily,
    color: colors.aquaDeep,
  },
});
