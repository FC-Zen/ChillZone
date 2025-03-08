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
    position: 'relative',
    height: layout.window.height * 0.6,
  },
  image: {
    margin: 0,
    padding: 0,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.black,
    overflow: 'hidden',
    width: 350,
    height: '100%',
  },
});
