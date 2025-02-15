import { colors, layout } from '@theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
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
  zoomableWrapper: {
    flex: 1,
    position: 'relative',
  },
  image: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.black,
    overflow: 'hidden',
    width: 350,
    height: layout.window.height * 0.6,
  },
});
