import { colors, typography } from '@theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkWarn,
    paddingTop: 100,
  },
  cont2: {
    width: '100%',
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  word: {
    color: colors.white,
    fontSize: typography.h3.fontSize,
    fontFamily: typography.h3.fontFamily,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    width: '90%',
    borderRadius: 50,
    marginVertical: 25,
    fontFamily: typography.h3.fontFamily,
  },
  primaryButton: {
    backgroundColor: colors.white,
  },
  iconContainer: {
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
});
