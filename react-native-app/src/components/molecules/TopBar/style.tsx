import { layout } from '@theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  header: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    display: 'flex',
    width: layout.screen.width,
    height: 128,
    marginTop: 20,
    paddingVertical: 28,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  rightIcons: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  spacing: {
    width: 30,
  },
  icon: {
    width: 45,
    height: 45,
  },
});
