import { colors, typography } from '@theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkWarn,
  },
  cont2: {
    paddingTop: 80,
    width: '100%',
    paddingHorizontal: 40,
  },
  word: {
    color: colors.white,
    fontSize: typography.h3.fontSize,
    fontFamily: typography.h1.fontFamily,
    marginBottom: 20,
  },
  word2: {
    color: colors.white,
    fontSize: typography.h3.fontSize,
    fontFamily: typography.h4.fontFamily,
    marginBottom: 20,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    width: '100%',
    padding: 15,
    borderRadius: 50,
    marginVertical: 20,
    fontFamily: typography.h3.fontFamily,
  },
  primaryButton: {
    backgroundColor: colors.white,
  },
  commentInput: {
    height: 120,
    borderColor: colors.silver,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    color: colors.black,
  },
});
