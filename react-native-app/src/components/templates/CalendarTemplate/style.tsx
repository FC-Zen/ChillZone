import { colors, typography } from '@theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    calendar: {
        width: '100%',
        height: '95%',
    },
    hourStyle: {
        color: colors.black,
        opacity: 0.7,
        fontFamily: typography.h1.fontFamily,
        fontSize: typography.h4.fontSize,
    },
});