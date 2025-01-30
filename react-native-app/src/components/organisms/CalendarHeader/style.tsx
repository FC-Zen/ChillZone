import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    headerContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingLeft: "12%",
  },
  dayContainer: {
    alignItems: "center",
    paddingHorizontal: 5,
  },
  selectedDayContainer: {
    borderBottomWidth: 2,
    borderBottomColor: "#4C1D95", // Violet pour le jour sélectionné
  },
  dayText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
  },
  dateText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  selectedText: {
    color: "#4C1D95", // Violet pour le jour sélectionné
  },
});