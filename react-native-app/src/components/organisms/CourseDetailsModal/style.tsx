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
    paddingTop: 60,
    paddingVertical: 20,
    paddingHorizontal: 20,
    maxWidth: 360,
    position: 'relative',
    gap: 10,
  },
  closeIcon: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: 10,
    right: 10,
    height: 36,
    width: 36,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  text: {
    color: colors.white,
    fontSize: typography.h3.fontSize,
    fontFamily: typography.h2.fontFamily,
    flexWrap: 'wrap',
    width: 300,
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
