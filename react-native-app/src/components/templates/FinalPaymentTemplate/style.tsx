import { typography } from "@theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        height: 'auto',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 36,
    },
    commandMessage: {
        textAlign: 'center',
        fontSize: typography.h3.fontSize,
        paddingHorizontal: '10%',
    },
    qrcodeImage: {
        width: '70%',
        objectFit: 'contain',
    },
    commandInfo: {
        textAlign: 'center',
        paddingHorizontal: '10%',
        fontFamily: typography.h3.fontFamily,
    },
    downloadButton: {
        borderRadius: 5,
    },
});