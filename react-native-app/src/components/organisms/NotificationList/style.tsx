import { layout } from "@theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: layout.screen.width,
    height: '70%',
    overflow: 'scroll',
  },
});