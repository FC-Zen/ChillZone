import { colors, typography } from "@theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({ 
    selectContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        width: '40%',
        zIndex: 10,
    },
    selectItem: {
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        width: '100%',
    },
    text: {
        fontSize: typography.h3.fontSize,
        fontFamily: typography.h4.fontFamily,
        paddingHorizontal: 8,
        paddingVertical: 4,
        width: '100%',
    },
    selectedText: {
        fontSize: typography.h3.fontSize,
        fontFamily: typography.h4.fontFamily,
    },
    selectedTextContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row-reverse',
        paddingVertical: 6,
        paddingHorizontal: 12,
    },
    selectMenu: {
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        zIndex: 10,
        backgroundColor: colors.resolutionBlue,
        borderRadius: 8,
        paddingVertical: 4,
        top: 40,
    },
    active: {
        width: '100%',
        height: 'auto',
    },
    inactive: {
        width: 0,
        height: 0,
        paddingHorizontal: 0,
        paddingVertical: 0,
    },
});