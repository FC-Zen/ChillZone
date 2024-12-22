import { StyleSheet } from 'react-native';
import { colors, typography } from '@theme';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 9,
    width: '100%',
  },
  headerText: {
    marginTop: 35,
    fontSize: 17,
    fontFamily: typography.h2.fontFamily,
    marginBottom: 15,
  },
  highlightedText: {
    color: colors.resolutionBlue,
    fontFamily: typography.h1.fontFamily,
  },
});
