import { colors, typography } from '@theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        bottom: 80,
    },
    calendar: {
        width: '100%',
        height: '85%',
    },
    hourStyle: {
        color: colors.black,
        opacity: 0.7,
        fontFamily: typography.h1.fontFamily,
        fontSize: typography.h4.fontSize,
    },
    calendarEvent: { 
        backgroundColor: colors.resolutionBlue, 
        borderRadius: 5,
    },
    calendarCell: { 
        borderColor: "white", 
        backgroundColor: "white" ,
        marginBottom: 0,
    },
});