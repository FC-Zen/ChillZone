import { StyleSheet } from 'react-native';
import { colors, layout } from '@theme';

export const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: layout.window.width,
    height: 100,
    padding: 14,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: colors.resolutionBlue,
    position: 'absolute',
    bottom: 0,
  },
  itemContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  icon: {
    width: 24,
    height: 24,
  },
  label: {
    color: colors.white,
    fontSize: 12,
  },
});
