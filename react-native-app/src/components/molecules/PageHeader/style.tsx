import { colors, layout, typography } from '@theme';
import { StyleSheet } from 'react-native';
import { fonts } from '@theme/typography';

export const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        height: 'auto',
        width: layout.screen.width,
        textAlign: 'left',
        paddingVertical: '3%',
        paddingHorizontal: '10%',
        gap: '20%',
      },
    back: {
        justifyContent: 'flex-start',
    },
    default: {
        justifyContent: 'center',
    },
    icon: {
        width: 16,
        height: 16,
    },
    title: {
        color: colors.black,
        textAlign: 'center',
        fontFamily: typography.h2.fontFamily,
        fontSize: typography.h2.fontSize,
    },
});
