import { colors, layout } from '@theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  cont: {
    width: '100%',
    backgroundColor: colors.white,
    gap: 20,
  },
  iconContainer: {
    width: 'auto',
    paddingVertical: 8,
    backgroundColor: colors.resolutionBlue,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    paddingHorizontal: 10,
  },
  bottomContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
