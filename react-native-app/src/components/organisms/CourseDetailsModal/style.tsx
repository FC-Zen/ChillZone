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
    width: '70%',
    height: '30%',
    maxWidth: 400,
  },
  closeIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 10,
  },
  text: {
    marginLeft: 10,
    color: colors.white,
    fontSize: typography.h3.fontSize,
    fontFamily: typography.h2.fontFamily,
    gap: 10,
  },
  stepText: {
    fontSize: 14,
    color: colors.white,
    marginBottom: 10,
  },
  image: {
    marginTop: 10,
    width: '100%',
    height: 200,
    resizeMode: 'contain',
  },
});
