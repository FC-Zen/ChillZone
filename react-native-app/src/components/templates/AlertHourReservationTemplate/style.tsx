import { colors, typography } from '@theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.aquaDeep,
  },
  cont2: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: colors.white,
    fontSize: 18,
    fontFamily: typography.h2.fontFamily,
    textAlign: 'center',
    marginBottom: 20,
  },
  timeSlot: {
    color: colors.white,
    fontSize: typography.h2.fontSize,
    fontFamily: typography.h2.fontFamily,
    marginBottom: 30,
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
  location: {
    color: colors.white,
    fontSize: typography.h3.fontSize,
    marginBottom: 5,
  },
  address: {
    color: colors.white,
    fontSize: typography.h3.fontSize,
    marginBottom: 5,
  },
  floor: {
    color: colors.white,
    fontSize: typography.h3.fontSize,
    marginBottom: 30,
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
  },
  primaryButton: {
    backgroundColor: colors.darkCyan,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.white,
  },
  dangerButton: {
    backgroundColor: colors.darkWarn,
  },
});
