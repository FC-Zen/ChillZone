import { StyleSheet } from 'react-native';
import { colors, typography } from '@theme';

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.70)',
  },
  modal: {
    backgroundColor: colors.resolutionBlue,
    borderRadius: 10,
    paddingHorizontal: 30,
    paddingTop: 60,
    paddingBottom: 10,
    width: '90%',
    position: 'relative',
  },
  closeIcon: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 10,
  },
  title: {
    fontSize: typography.h2.fontSize,
    fontFamily: typography.h2.fontFamily,
    color: colors.white,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: colors.white,
    borderRadius: 10,
    marginBottom: 15,
  },
  validationTagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 10,
    gap: 5,
    justifyContent: 'center',
    alignContent: 'center',
  },
  validationTag: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    paddingVertical: 4,
    paddingHorizontal: 5,
    marginVertical: 4,
    gap: 5,
  },
  validTag: {
    backgroundColor: '#DFF2E0',
    borderColor: colors.aquaDeep,
    borderWidth: 1,
  },
  invalidTag: {
    backgroundColor: colors.warn,
    borderColor: colors.warn,
    borderWidth: 1,
  },
  validationTagText: {
    fontSize: 12,
    fontWeight: '500',
  },
  validText: {
    color: colors.aquaDeep,
  },
  invalidText: {
    color: colors.white,
  },
  button: {
    backgroundColor: colors.aquaDeep,
    borderRadius: 50,
    padding: 12,
    alignItems: 'center',
    marginBottom: 10,
    width: '40%',
    alignSelf: 'center',
    marginTop: 10,
  },
  buttonText: {
    fontSize: typography.h3.fontSize,
    fontFamily: typography.h2.fontFamily,
    color: colors.white,
    fontWeight: 'bold',
  },
});
