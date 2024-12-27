import { colors, typography } from '@theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: '5%',
        paddingHorizontal: '5%',
    },
    formContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        alignContent: 'center',
        justifyContent: 'flex-start',
        backgroundColor: colors.resolutionBlue,
        borderRadius: 15,
        paddingHorizontal: '6%',
        paddingVertical: '8%',
        gap: 20,
    },
    formTitle: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    inputsContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        gap: 20,
        paddingVertical: '2%',
    },
    inputTitle: {
        textAlign: 'left',
        fontFamily: typography.h4.fontFamily,
        fontSize: typography.h4.fontSize,
        color: colors.white,
    },
    inputsRow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
    },
    input: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    subtitledInput: {
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    smallInputContainer: {
        width: '48%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    payButton: {
        width: '100%',
        alignSelf: 'center',
        borderRadius: 5,
    }

});