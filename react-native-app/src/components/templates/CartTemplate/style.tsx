import { colors, typography } from "@theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        display: "flex",
        width: '100%',
        height: '100%',
        justifyContent: "flex-start",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    commonColumn: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: '100%',
        gap: 10,
    },
    content: {
        height: 'auto',
        gap: 10,
        backgroundColor: 'red',
    },
    restaurant: {
        gap: 8,
    },
    imageContainer: {
        width: '100%',
        height: 96,
        borderRadius: 15,
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 15,
    },
    title: {
        fontSize: typography.h3.fontSize,
        fontFamily: typography.h1.fontFamily,
        color: colors.aquaDeep,
        textAlign: 'left',
        width: '100%',
    },
    collect: {
        gap: 14,
    },
    collectSlots: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: '100%',
    },
    command: {
        gap: 9,
    },
    total: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: '100%',
    },
    totalText: {
        fontSize: typography.h3.fontSize,
        fontFamily: typography.h1.fontFamily,
        color: colors.black,
    },
    totalPrice: {
        fontSize: typography.h3.fontSize,
        fontFamily: typography.h4.fontFamily,
        color: colors.black,
    },
    payBtn: {
    }
});