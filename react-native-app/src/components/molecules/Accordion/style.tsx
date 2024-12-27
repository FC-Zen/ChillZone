import { StyleSheet } from 'react-native';
import { colors, typography } from '@theme';

export const styles = StyleSheet.create({
  accordion: {
    width: '100%',
    backgroundColor: colors.resolutionBlue,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.white,
    marginBottom: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  title: {
    color: colors.white,
    fontSize: typography.h4.fontSize,
    fontFamily: typography.h4.fontFamily,
    fontWeight: 'bold',
    flex: 1,
    flexWrap: 'wrap',
  },
  iconContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  answer: {
    color: colors.white,
    fontSize: typography.h4.fontSize,
    fontFamily: typography.h4.fontFamily,
    textAlign: 'justify',
  },
});