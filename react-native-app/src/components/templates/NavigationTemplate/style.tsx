import { colors, layout } from '@theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  cont: {
    backgroundColor: colors.white,
    width: '100%',
    gap: 20,
  },
  image: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.black,
    width: 350,
    height: layout.window.height * 0.6,
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
  scrollView: {
    width: '100%',
  },
  scrollContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
