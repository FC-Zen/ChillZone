import { colors, typography } from '@theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '25%',
        display: 'flex',
    },
    title: {
        fontSize: typography.h3.fontSize,
        fontFamily: typography.h1.fontFamily,
        color: colors.aquaDeep,
    },
    totalText: {
        fontSize: typography.h3.fontSize,
        fontFamily: typography.h1.fontFamily,
        color: colors.black,
    },
    price: {
        fontSize: typography.h3.fontSize,
        fontFamily: typography.h4.fontFamily,
        color: colors.black,
        width: '20%',
        textAlign: 'right',
    },
    name: {
        fontSize: typography.h3.fontSize,
        fontFamily: typography.h3.fontFamily,
        color: colors.black,
        width: '50%',
    },
    items: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
    },
    item: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    total: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    menu: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: '100%',
    }
});