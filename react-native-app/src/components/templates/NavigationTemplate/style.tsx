import { colors, layout } from '@theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  cont: {
    width: '100%',
    backgroundColor: colors.white,
    gap: 20,
  },
  zoomableContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: layout.window.height * 0.6,
    gap: 10,
    overflow: 'hidden',
    maxHeight: layout.window.height * 0.6,
    maxWidth: '100%',
  },
  image: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.black,
    width: 350,
    height: layout.window.height * 0.6,
    overflow: 'hidden',
  },
  zoomable: {
    width: 'auto',
    height: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
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
  zoomableWrapper: {
    flex: 1,
    position: 'relative',
  },
});
