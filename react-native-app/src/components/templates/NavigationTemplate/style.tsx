import { colors, layout } from '@theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  cont: {
    backgroundColor: colors.white,
    width: '100%',
  },
  image: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.black,
    width: 350,
    height: layout.window.height * 0.6,
  },
  iconContainer: {
    position: 'absolute',
    bottom: -25,
    right: 0,
    width: '38%',
    paddingVertical: 6,
    backgroundColor: colors.resolutionBlue,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    paddingHorizontal: 10,
  },
  scrollView: {
    position: 'relative',
    width: '100%',
  },
  scrollContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
