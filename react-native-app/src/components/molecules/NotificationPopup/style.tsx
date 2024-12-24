import { colors, typography } from '@theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-evenly',
    width: '90%',
    height: 'auto',
    backgroundColor: colors.white,
    borderRadius: 10,
    gap: 12,
    padding: '5%',
  },

  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: 'auto',
  },

  date: {
    color: colors.black,
    fontFamily: typography.h4.fontFamily,
    fontSize: typography.h4.fontSize,
  },

  title: {
    color: colors.resolutionBlue,
    fontFamily: typography.h2.fontFamily,
    fontSize: typography.h3.fontSize,
  },

  description: {
    color: colors.black,
    fontFamily: typography.h4.fontFamily,
    fontSize: typography.h4.fontSize,
  },

});