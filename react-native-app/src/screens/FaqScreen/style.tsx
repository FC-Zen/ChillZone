import { layout } from '@theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  //Style du conteneur principale pour la page de Faq
  container: {
    width: layout.screen.width,
    height: layout.screen.height,
    backgroundColor: '#f9fafb',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 70,
    display: 'flex',
    flexDirection: 'column',
    gap: 35
  },
});
