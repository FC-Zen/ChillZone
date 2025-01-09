import { layout } from '@theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    paddingBottom: 24,
    paddingTop: 30,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: layout.screen.width,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  container: {
    height: '100%',
    position: 'relative',
    top: -60,
  },
  selectedButtonMeal: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    paddingBottom: 10,
    paddingTop: 31,
  },
});
