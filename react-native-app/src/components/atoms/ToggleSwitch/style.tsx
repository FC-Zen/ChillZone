import { StyleSheet } from 'react-native';
import { colors } from '@theme';

export const styles = StyleSheet.create({
  container: {
    width: 50, // Largeur du toggle
    height: 28, // Hauteur du toggle
    backgroundColor: colors.white, // Fond blanc
    borderRadius: 14, // Coins arrondis pour correspondre à la hauteur divisée par 2
    justifyContent: 'center', // Centre verticalement
    paddingHorizontal: 2, // Évite que le rond touche les bords
  },
  switch: {
    transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }], // Augmente légèrement la taille du toggle
  },
});
