import { colors, typography } from '@theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingLeft: "14%",
  },
  dayContainer: {
    alignItems: "center",
    width: 30,
    height: 50,
  },
  selectedDayContainer: {
    paddingHorizontal: 0,
  },
  dayText: {
    fontSize: typography.h3.fontSize,
    fontFamily: typography.h1.fontFamily,
    color: colors.black,
  },
  dateText: {
    fontSize: typography.h3.fontSize,
    fontFamily: typography.h2.fontFamily,
    color: colors.black,
    textDecorationStyle: "solid",
  },
  selectedDate: {
    color: colors.white, // Violet pour le jour sélectionné
    fontFamily: typography.h1.fontFamily,

  },
  selectedDateContainer: {
    backgroundColor: colors.resolutionBlue, // Fond violet pour le jour sélectionné
    borderRadius: 50,
    width: 30,
    height: 30,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});