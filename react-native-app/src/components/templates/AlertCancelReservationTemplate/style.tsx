import { colors, typography } from '@theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.aquaDeep,
  },
  cont2: {
    paddingVertical: 80,
    width: '100%',
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 32,
    color: colors.aquaDeep,
  },
  word: {
    color: colors.white,
    fontSize: typography.h3.fontSize,
    marginTop: 60,
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    width: '90%',
    padding: 15,
    borderRadius: 50,
    marginVertical: 10,
    fontFamily: typography.h3.fontFamily,
  },
  primaryButton: {
    backgroundColor: colors.white,
  },
});
