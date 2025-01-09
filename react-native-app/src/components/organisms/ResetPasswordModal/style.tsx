import { StyleSheet } from 'react-native';
import { colors, typography } from '@theme';

export default StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modal: {
    backgroundColor: colors.resolutionBlue,
    borderRadius: 10,
    padding: 20,
    width: '90%',
    maxWidth: 400,
    alignItems: 'center',
  },
  title: {
    color: colors.white,
    fontSize: typography.h2.fontSize,
    fontFamily: typography.h2.fontFamily,
    display: 'flex',
    padding: 20,
    justifyContent: 'center',
  },
  subtitle: {
    color: colors.white,
    fontSize: typography.h3.fontSize,
    fontFamily: typography.h2.fontFamily,
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 15,
  },
  input: {
    backgroundColor: colors.white,
    borderRadius: 8,
    marginBottom: 15,
    width: '100%',
  },
  button: {
    backgroundColor: colors.aquaDeep,
    borderRadius: 50,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    width: '60%',
    gap: 10,
  },
  buttonText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: typography.h3.fontSize,
    fontFamily: typography.h3.fontFamily,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});
