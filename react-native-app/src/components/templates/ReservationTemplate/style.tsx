import { StyleSheet } from 'react-native';
import { colors, layout, typography } from '@theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    top: -30,
  },
  padd: {
    paddingHorizontal: 51,
  },
  padd2: {
    paddingHorizontal: 29,
  },
  scrollView: {
    width: '100%',
    flex: 1,
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
  titleSep: {
    fontSize: typography.h3.fontSize,
    color: colors.black,
    justifyContent: 'flex-start',
    width: layout.screen.width,
    fontFamily: typography.h3.fontFamily,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    paddingBottom: 100,
    paddingTop: 31,
  },
});
