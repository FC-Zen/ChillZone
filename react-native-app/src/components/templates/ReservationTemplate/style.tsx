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
    justifyContent: 'flex-start',
    width: layout.screen.width,
    fontFamily: typography.h3.fontFamily,
  },
  separator: {
    height: 1,
    backgroundColor: colors.darkCyan,
    marginVertical: 25,
  },
  scrollView: {
    width: '100%',
  },
  scrollContainer: {
    paddingBottom: 100,
  },
  titleSep: {
    fontSize: typography.h3.fontSize,
    color: colors.black,
    justifyContent: 'flex-start',
    width: layout.screen.width,
    fontFamily: typography.h3.fontFamily,
  },
});
