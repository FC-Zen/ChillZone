import { StyleSheet } from 'react-native';
import { colors, typography } from '@theme';

export default StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.70)',
  },
  modal: {
    backgroundColor: colors.resolutionBlue,
    borderRadius: 10,
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    width: '90%',
    alignItems: 'center',
  },
  title: {
    color: colors.white,
    fontSize: typography.h2.fontSize,
    fontFamily: typography.h2.fontFamily,
    display: 'flex',
    padding: 20,
    textAlign: 'center',
    justifyContent: 'center',
  },
  subtitle: {
    color: colors.white,
    fontSize: typography.h3.fontSize,
    fontFamily: typography.h2.fontFamily,
    display: 'flex',
    justifyContent: 'center',
    marginVertical: 25,
  },
  input: {
    backgroundColor: colors.white,
    borderRadius: 8,
    marginBottom: 15,
    width: '100%',
  },
  closeButton: {
    position: 'absolute',
    top: 25,
    right: 25,
  },
});
