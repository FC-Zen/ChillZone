import { StyleSheet } from 'react-native';
import { colors, layout, typography } from '@theme';

export const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: layout.window.width,
    height: 80,
    padding: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.resolutionBlue,
    position: 'absolute',
    bottom: 0,
  },
  itemContainer: {
    width: 68,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  icon: {
    width: 24,
    height: 24,
  },
  label: {
    color: colors.white,
    fontSize: 12,
    fontFamily: typography.h3.fontFamily,
  },
});
