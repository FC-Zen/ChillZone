import { colors, typography } from '@theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: { alignItems: 'center', marginTop: 20, marginBottom: 10 },
  avatar: {
    borderRadius: 40,
    backgroundColor: colors.resolutionBlue,
  },
  name: {
    fontSize: 20,
    fontFamily: typography.h2.fontFamily,
  },
});
