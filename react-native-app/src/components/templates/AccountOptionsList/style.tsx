import { StyleSheet } from 'react-native';
import { colors } from '@theme';
import { typography } from '@theme';

export const styles = StyleSheet.create({
  lightContainer: {
    flexGrow: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },

  darkContainer: {
    flexGrow: 1,
    backgroundColor: colors.darkGray,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  card: {
    backgroundColor: colors.resolutionBlue,
    borderRadius: 20,
    padding: 5,
    marginBottom: 10,
  },
  // Bouton personnalisé pour "Réinitialiser mon mot de passe"
  resetPasswordButton: {
    paddingVertical: 12, // Espacement vertical
    paddingHorizontal: 20, // Espacement horizontal
    paddingLeft: 55, // Espacement à gauche
    justifyContent: 'center', // Centrage vertical
    maxWidth: 300, // Forcer une largeur maximale pour ce bouton
    color: colors.white,
    fontSize: typography.h3.fontSize,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: 10,
  },
  languageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginRight: 10,
  },
  languageContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  languageIconWrapper: {
    marginRight: 10,
  },
  languageSelectorWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flag: {
    width: 39,
    height: 22,
    marginRight: 5,
  },

  newsButton: {
    display: 'flex', // Ajoute le flex pour la structure de la boîte
    paddingVertical: 12, // Conforme à `padding: 12px 20px` verticalement
    paddingHorizontal: 20, // Conforme à `padding: 12px 20px` horizontalement
    justifyContent: 'center', // Centre le contenu verticalement
    alignItems: 'center', // Centre le contenu horizontalement
    gap: 10, // Ajoute un espacement entre les éléments enfants
    borderRadius: 50, // Bord arrondi (50px)
    borderWidth: 2, // Bordure de 2px
    borderColor: colors.resolutionBlue, // Couleur de bordure
    alignSelf: 'center', // Centré horizontalement
    marginTop: 10, // Espacement en haut
  },

  newsText: {
    color: colors.resolutionBlue,
    fontWeight: 'bold',
    fontSize: 14,
    fontFamily: 'Montserrat', // Police Montserrat
    textAlign: 'center', // Aligne le texte au centre
    lineHeight: 16, // Correspond à 100% de 16px
    fontStyle: 'normal', // Style de police
  },
  newsButton: {
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: colors.resolutionBlue,
    borderRadius: 50,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginTop: 10,
  },
  newsText: {
    color: colors.resolutionBlue,
    fontWeight: 'bold',
    fontSize: 14,
  },
  newsButton: {
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: colors.resolutionBlue,
    borderRadius: 80,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  newsText: {
    color: colors.resolutionBlue,
    fontWeight: 'bold',
    fontSize: 14,
  },
});
