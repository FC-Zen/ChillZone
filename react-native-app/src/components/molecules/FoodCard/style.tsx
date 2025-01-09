import { colors, typography } from '@theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 2,
    borderColor: colors.silver,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    flex: 1,
  },
  title: {
    color: colors.resolutionBlue,
    fontFamily: typography.h2.fontFamily,
    paddingVertical: 5,
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 18,
  },
  price: {
    color: colors.black,
    fontFamily: typography.h3.fontFamily,
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 18,
  },
  subTitle: {
    color: colors.resolutionBlue,
    fontFamily: typography.h3.fontFamily,
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
  },
  imageContainer: {
    width: 95,
    height: 95,
    position: 'relative',
    marginRight: 10,
    marginVertical: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  iconContainer: {
    position: 'absolute',
    bottom: 5,
    right: 5,
  },
  separator: {
    height: 1,
    backgroundColor: colors.silver,
    alignSelf: 'stretch',
    marginVertical: 0.027,
  },
});
