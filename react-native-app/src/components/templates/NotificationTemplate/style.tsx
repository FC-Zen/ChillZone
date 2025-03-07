import { colors, typography } from '@theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: '100%',
    height: '80%',
    gap: 60,
  },
  txt: {
    fontSize: typography.h3.fontSize,
    fontFamily: typography.h2.fontFamily,
    color: colors.resolutionBlue,
    marginHorizontal: 20,
    textAlign: 'center',
  },
});
