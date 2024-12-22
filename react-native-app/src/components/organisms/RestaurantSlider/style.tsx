import { colors, typography } from '@theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 17,
    fontFamily: typography.h2.fontFamily,
    marginBottom: 15,
  },
  highlightedText: {
    fontFamily: typography.h1.fontFamily,
    color: colors.aquaDeep,
  },
});
