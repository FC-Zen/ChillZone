import { colors, layout, typography } from '@theme';
import { StyleSheet } from 'react-native';
import { fonts } from '@theme/typography';

export const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 'auto',
        textAlign: 'center',
        paddingVertical: '3%',
        paddingHorizontal: 20,  
    },
    backButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: 16,
        height: 16,
        marginRight: 10,
    },
    icon: {
        width: 16,
        height: 16,
    },
    title: {
        width: 326,
        color: colors.black, 
        textAlign: 'center',
        fontFamily: fonts.semiBold,
        fontSize: typography.h2.fontSize,
        fontWeight: '600',
    },
});