import { colors, typography } from "@theme";
import { t } from "i18next";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center',
        justifyContent: 'space-between',
        paddingVertical: 5,
        borderWidth: 2,
        borderRadius: 10,
        borderColor: colors.aquaDeep,
        width: 164,
        height: 80,
    },
    horizontalContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    radioCircle: {
        height: 16,
        width: 16,
        padding: 8,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: colors.darkCyan,
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectedCircle: {
        height: 12,
        width: 12,
        borderRadius: 6,
        backgroundColor: colors.darkCyan,
    },
    title: {
        fontSize: typography.h3.fontSize,
        fontFamily: typography.h1.fontFamily,
        color: colors.darkCyan,
    },
    time: {
        fontSize: typography.h4.fontSize,
        fontFamily: typography.h1.fontFamily,
        color: colors.darkCyan,
    },
});