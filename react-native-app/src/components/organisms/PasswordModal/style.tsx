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
    backgroundColor: '#2E2A85',
    borderRadius: 10,
    padding: 20,
    width: '90%',
    maxWidth: 400,
    position: 'relative', // Nécessaire pour positionner la croix
  },
  closeIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
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
    borderRadius: 8,
    marginBottom: 15,
  },
  validationTagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
    gap: 8,
  },
  validationTag: {
    flexDirection: 'row', // Alignement horizontal
    alignItems: 'center', // Centrer verticalement
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginRight: 8,
    marginBottom: 8,
  },
  validTag: {
    backgroundColor: '#DFF2E0',
    borderColor: '#00A859',
    borderWidth: 1,
  },
  invalidTag: {
    backgroundColor: colors.warn,
    borderColor: '#FF5A5A',
    borderWidth: 1,
  },
  validationTagText: {
    fontSize: 12,
    fontWeight: '500',
  },
  validText: {
    color: '#00A859',
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
    width: '60%',
    alignSelf: 'center',
  },
  buttonText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: typography.h4.fontSize,
    fontFamily: typography.h4.fontFamily,
  },
});
