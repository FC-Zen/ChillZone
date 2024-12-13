import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 52,
        paddingHorizontal: 30,
        backgroundColor: '#fff',
        marginTop: '5%',
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
        color: '#000', 
        textAlign: 'center',
        fontFamily: 'Montserrat',
        fontSize: 24,
        fontWeight: '600',
        lineHeight: 28,
    },
});