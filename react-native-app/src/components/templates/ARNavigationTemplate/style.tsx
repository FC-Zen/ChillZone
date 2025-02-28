import { colors, typography } from "@theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 30,
    },
    content: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        gap: 30,
    },
    infoMessage: {
        textAlign: "center",
        paddingHorizontal: "20%",
        fontFamily: typography.h3.fontFamily,
        fontSize: typography.h4.fontSize,
    },
    videoTitle: {
        textAlign: "center",
        fontFamily: typography.h2.fontFamily,
        fontSize: typography.h4.fontSize,
    },
    videoContainer: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "auto",
        width: "100%",
        gap: 10,
    },
    videos: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 15,
    },
    video: {
        width: "82%",
        height: 180,
        borderRadius: 10,
        overflow: "hidden",
    },
    redirectContainer: {
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        gap: 10,
    },
    redirectMessage: {
        fontFamily: typography.h3.fontFamily,
        fontSize: typography.h4.fontSize,
        textAlign: "center",
    },
    redirectButtonText: {
        fontFamily: typography.h1.fontFamily,
        fontSize: typography.h3.fontSize,
        color: colors.black,
    },
    redirectButton: {
        backgroundColor: colors.white,
        borderWidth: 1,
        borderColor: colors.black,
        width: "60%",
    },
});