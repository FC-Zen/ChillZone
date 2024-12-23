import { layout } from "@theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    flexDirection: "column",
  },
  outsideArea: {
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
    display: 'flex',
    flex : 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    display: 'flex',
    width: '100%',
    height: '100%',
    backgroundColor: 'hsla(0, 0%, 0%, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    width: 'auto',
    height: 'auto',
    borderRadius: 10,
  },
});