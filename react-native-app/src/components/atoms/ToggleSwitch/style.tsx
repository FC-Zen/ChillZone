import { StyleSheet } from 'react-native';
import { colors } from '@theme';

export const styles = StyleSheet.create({
  container: {
    width: 50, // Largeur globale du toggle
    height: 28, // Hauteur globale
    borderRadius: 14, // Coins arrondis
    padding: 2, // Espace interne pour le switch
    justifyContent: 'center', // Centrage vertical
  },
  switch: {
    transform: [{ scaleX: 1 }, { scaleY: 1 }], // Taille par défaut du switch
  },
});
