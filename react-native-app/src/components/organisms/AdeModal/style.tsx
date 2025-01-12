import { StyleSheet } from 'react-native';
import { colors, typography } from '@theme';

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fond semi-transparent
  },
  modal: {
    backgroundColor: colors.resolutionBlue, // Couleur principale
    borderRadius: 10,
    padding: 20,
    width: '90%',
    maxWidth: 400,
    alignItems: 'center',
  },
  helpButtonContainer: {
    alignSelf: 'flex-start', // Positionne le bouton "Aide" à gauche
    marginBottom: 10, // Espacement sous le bouton
  },
  helpButton: {
    backgroundColor: colors.white,
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: colors.aquaDeep,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    color: colors.white,
    marginBottom: 15,
    textAlign: 'center',
    fontFamily: typography.h2.fontFamily,
    fontSize: typography.h2.fontSize,
    width: '80%',
  },
  subtitle: {
    color: colors.white,
    marginBottom: 10,
    textAlign: 'center',
    fontFamily: typography.h3.fontFamily,
    fontSize: typography.h3.fontSize,
    width: '100%',
  },
  input: {
    backgroundColor: colors.white,
    borderRadius: 5,
    marginBottom: 15,
    width: '100%',
  },
  validateButton: {
    backgroundColor: colors.aquaDeep,
    borderRadius: 50,
    padding: 10,
    width: '60%',
    alignItems: 'center',
  },
  closeIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});
