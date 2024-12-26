import { layout } from '@theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: layout.screen.width,
        height: layout.screen.height,
    },
    infoText: {
        width: '90%',
    },
});