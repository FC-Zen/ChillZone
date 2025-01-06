import { StyleSheet } from 'react-native';
import { colors } from '@theme';

export const styles = StyleSheet.create({
  lightContainer: {
    flexGrow: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },

  darkContainer: {
    flexGrow: 1,
    backgroundColor: colors.darkGray,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  card: {
    backgroundColor: colors.resolutionBlue,
    borderRadius: 20,
    padding: 5,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  languageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  languageContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  languageIconWrapper: {
    marginRight: 10,
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
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: colors.resolutionBlue,
    borderRadius: 50,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginTop: 10,
  },
  newsText: {
    color: colors.resolutionBlue,
    fontWeight: 'bold',
    fontSize: 14,
  },
});
