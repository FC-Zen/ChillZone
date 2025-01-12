import { layout } from '@theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        width: layout.screen.width,
        height: layout.screen.height,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
});