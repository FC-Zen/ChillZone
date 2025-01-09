import { StyleSheet } from 'react-native';
import { colors } from '@theme';
import { typography } from '@theme';

export const styles = StyleSheet.create({
  lightContainer: {
    flexGrow: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 20,
  },

  darkContainer: {
    flexGrow: 1,
    backgroundColor: colors.silver,
    paddingHorizontal: 20,
  },

  card: {
    backgroundColor: colors.resolutionBlue,
    borderRadius: 20,
    marginVertical: 10,
  },
  card2: {
    backgroundColor: colors.resolutionBlue,
    borderRadius: 20,
    paddingVertical: 15,
    marginVertical: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  col: {
    flexDirection: 'column',
    paddingHorizontal: 30,
  },

  languageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  languageContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  languageSelectorWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flag: {
    width: 39,
    height: 22,
    marginRight: 5,
  },

  newsButton: {
    display: 'flex',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: colors.resolutionBlue,
    alignSelf: 'center',
    marginTop: 20,
  },

  newsText: {
    color: colors.resolutionBlue,
    fontFamily: typography.h3.fontFamily,
    fontSize: typography.h3.fontSize,
    textAlign: 'center',
    lineHeight: 16,
  },
});
