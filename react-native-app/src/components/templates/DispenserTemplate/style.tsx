import { colors, layout } from '@theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 24,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    width: layout.screen.width,
    paddingHorizontal: 25,
    marginBottom: 20,
  },
  selectedButtonMeal: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
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
    padding: 10,
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
    paddingVertical: 10,
  },
});
