import { colors } from '@theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fond semi-transparent
  },
  modal: {
    backgroundColor: colors.resolutionBlue,
    borderRadius: 15,
    padding: 20,
    width: '90%',
    maxWidth: 400,
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    zIndex: 10,
  },
  closeButtonText: {
    fontSize: 16,
    fontFamily: 'Montserrat',
    fontWeight: '600', // Semi-bold
    lineHeight: 16, // Line height exact de 100%
    color: colors.white,
  },
  avatarContainer: {
    backgroundColor: colors.white,
    borderRadius: 50,
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarIcon: {
    fontSize: 40,
    color: colors.resolutionBlue,
  },
  primaryButton: {
    backgroundColor: colors.white,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 15,
    width: '100%',
  },
  primaryButtonText: {
    fontSize: 16,
    fontFamily: 'Montserrat',
    fontWeight: '600', // Semi-bold
    lineHeight: 16, // 100% de la taille de la police
    color: colors.resolutionBlue,
    textAlign: 'center',
  },
  secondaryButton: {
    backgroundColor: colors.warn,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    width: '100%',
  },
  secondaryButtonText: {
    fontSize: 16,
    fontFamily: 'Montserrat',
    fontWeight: '600', // Semi-bold
    lineHeight: 16, // 100% de la taille de la police
    color: colors.white,
    textAlign: 'center',
  },
});
