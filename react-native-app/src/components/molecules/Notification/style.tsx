import { colors } from '@theme';
import { fonts, typography } from '@theme/typography';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 'auto',
    paddingHorizontal: '3%',
    paddingVertical: '4%',
    borderWidth: 0.5,
    borderColor: colors.silver,
    backgroundColor: colors.white,
    gap: 10,
  },
  iconContainer: {
    width: 50,
    height: 50,
    padding: 13,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: colors.resolutionBlue,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  title: {
    width: '98%',
    color: colors.resolutionBlue,
    fontFamily: typography.h2.fontFamily,
    fontSize: typography.h3.fontSize,
  },
  message: {
    width: '98%',
    maxHeight: 40,
    color: colors.black,
    fontFamily: typography.h3.fontFamily,
    fontSize: typography.h3.fontSize,
  },
  time: {
    color: colors.black,
    fontFamily: typography.h4.fontFamily,
    fontSize: typography.h4.fontSize,
    lineHeight: 18,
  },
});
