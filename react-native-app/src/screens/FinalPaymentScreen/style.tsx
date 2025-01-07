import { colors, layout } from "@theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        width: layout.screen.width,
        height: layout.screen.height,
        backgroundColor: colors.white,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
});