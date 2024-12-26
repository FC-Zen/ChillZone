import { layout } from '@theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  // Style pour le conteneur globale des Q&A
  scrollView: {
    display: 'flex',
    width: layout.window.width * 0.9, //On prend 90% de l'écran total
    paddingVertical: 25,
    flexDirection: 'column',
  },
});
