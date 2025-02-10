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
        borderRadius: 8,
        fontSize: 28,
    },
    calendarCell: { 
        borderColor: "white", 
        backgroundColor: "white" ,
        marginBottom: 0,
    },
    eventText: {
        fontSize: typography.h1.fontSize,
        fontFamily: typography.h1.fontFamily,
    },
    eventCell: {
        backgroundColor: colors.resolutionBlue,
        padding: 10,
    },
    calendarLinkButton: {
        width: 'auto',
        borderRadius: 8,
        backgroundColor: colors.resolutionBlue,
        paddingVertical: 0,
        paddingHorizontal: 20,
    },
    rowContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        height: 'auto',
        width: '100%',
    },
});