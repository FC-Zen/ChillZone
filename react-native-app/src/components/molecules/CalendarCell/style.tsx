import { colors, typography } from "@theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.resolutionBlue,
        borderRadius: 6,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        gap: 4,
    },
    text: {
        color: colors.white, 
        fontSize: 10, 
        fontFamily: typography.h2.fontFamily
    },
});