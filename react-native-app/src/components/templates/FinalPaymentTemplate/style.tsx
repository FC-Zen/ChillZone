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
    },
    qrcodeImage: {
        width: '70%',
        objectFit: 'contain',
    },
    commandInfo: {
        textAlign: 'center',
    },
    downloadButton: {
        borderRadius: 5,
    },
});