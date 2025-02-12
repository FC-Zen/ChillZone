import { colors, typography } from '@theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.70)',
  },
  modal: {
    backgroundColor: colors.resolutionBlue,
    borderRadius: 15,
    paddingVertical: 50,
    paddingHorizontal: 20,
    width: '85%',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 10,
  },
  avatarContainer: {
    backgroundColor: colors.white,
    borderRadius: 50,
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 28,
  },
  avatarIcon: {
    fontSize: 40,
    color: colors.resolutionBlue,
  },
  primaryButton: {
    backgroundColor: colors.white,
    borderRadius: 50,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 15,
    width: '100%',
  },
  primaryButtonText: {
    fontSize: typography.h3.fontSize,
    fontFamily: typography.h2.fontFamily,
    color: colors.resolutionBlue,
    textAlign: 'center',
  },
  secondaryButton: {
    backgroundColor: colors.warn,
    borderRadius: 50,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    width: '100%',
  },
  secondaryButtonText: {
    fontSize: typography.h3.fontSize,
    fontFamily: typography.h2.fontFamily,
    color: colors.white,
    textAlign: 'center',
  },
});
