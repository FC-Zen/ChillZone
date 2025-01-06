import { StyleSheet } from 'react-native';
import { colors, layout, typography } from '@theme';

export const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: layout.screen.width,
    paddingHorizontal: 51,
  },
  title: {
    fontSize: typography.h3.fontSize,
    color: colors.black,
    paddingHorizontal: 51,
    justifyContent: 'flex-start',
    width: layout.screen.width,
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  separator: {
    height: 1,
    backgroundColor: colors.darkCyan,
    marginTop: 10,
  },
});
