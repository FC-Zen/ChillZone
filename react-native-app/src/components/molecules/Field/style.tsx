import { colors, typography } from '@theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    display: 'flex',
    height: 50,
    width: '60%',
    minWidth: 200,
    padding: 10,
    paddingHorizontal: 25,
    alignItems: 'center',
    gap: 15,
    flexDirection: 'row',
    borderColor: colors.silver,
    borderWidth: 2,
    borderRadius: 10,
    flex: 0,
  },
  input: {
    flex: 1,
    height: '100%',
    padding: 0,
    fontSize: typography.h3.fontSize,
    fontFamily: typography.h3.fontFamily,
    color: colors.black,
  },
});
