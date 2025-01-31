import { StyleSheet } from 'react-native';
import { colors, typography } from '@theme';

export const styles = StyleSheet.create({
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
  closeIcon: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
  title: {
    fontSize: typography.h2.fontSize,
    fontFamily: typography.h2.fontFamily,
    color: colors.white,
    marginBottom: 20,
    textAlign: 'center',
  },
  stepText: {
    fontSize: typography.h3.fontSize,
    fontFamily: typography.h2.fontFamily,
    justifyContent: 'center',
    alignContent: 'center',
    marginLeft: 50,
    color: colors.white,
    marginBottom: 10,
    textAlign: 'left',
    width: '100%',
  },
  finalText: {
    fontSize: typography.h3.fontSize,
    fontFamily: typography.h3.fontFamily,
    color: colors.white,
    marginTop: 20,
    textAlign: 'center',
  },
  image: {
    width: '70%',
    height: 150,
    resizeMode: 'contain',
    marginVertical: 10,
  },
  stepContainer: {
    flexDirection: 'row', // Aligne le cercle et le texte en ligne
    alignItems: 'center',
    marginBottom: 15,
  },
  indicationText: {
    fontSize: 16,
    color: colors.white,
    flex: 1, // Permet au texte de prendre la place restante
  },
});
