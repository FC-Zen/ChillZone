import { colors, layout, typography } from '@theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    paddingBottom: 24,
    paddingTop: 5,
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
    top: -80,
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
  search: {
    backgroundColor: 'none',
    display: 'flex',
    height: 50,
    minWidth: 220,
    paddingHorizontal: 25,
    alignItems: 'center',
    gap: 15,
    flexDirection: 'row',
    borderColor: colors.silver,
    borderWidth: 2,
    borderRadius: 10,
    flex: 0,
    fontFamily: typography.h3.fontFamily,
    fontSize: typography.h3.fontSize,
  },
});
