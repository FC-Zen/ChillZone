import { colors, layout } from '@theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    paddingVertical: 24,
  },
  container: {
    height: '100%',
    position: 'relative',
    top: -80,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: layout.screen.width,
    paddingHorizontal: 10,
    paddingVertical: 14,
  },
  selectedButtonMeal: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  foodCardList: {
    width: '100%',
    paddingHorizontal: 5,
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 10,
  },
  foodCardItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.silver,
  },
  foodCardText: {
    flex: 1,
    marginLeft: 10,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    paddingBottom: 24,
    paddingTop: 31,
  },
});
