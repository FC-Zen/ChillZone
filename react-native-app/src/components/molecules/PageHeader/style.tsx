import { colors, layout, typography } from '@theme';
import { StyleSheet } from 'react-native';
import { fonts } from '@theme/typography';

export const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 'auto',
    width: layout.screen.width,
    textAlign: 'left',
    paddingVertical: 35,
    paddingHorizontal: 30,
    gap: 20,
  },
  back: {
    justifyContent: 'flex-start',
  },
  default: {
    justifyContent: 'center',
  },
  title: {
    color: colors.black,
    textAlign: 'center',
    fontFamily: typography.h2.fontFamily,
    fontSize: typography.h2.fontSize,
    flex: 1,
  },
  titleWithBack: {
    textAlign: 'center',
  },
  spacer: {
    width: 16,
  },
});
