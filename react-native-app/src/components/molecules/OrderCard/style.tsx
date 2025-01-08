import { StyleSheet } from 'react-native';
import { colors, typography } from '@theme';

export const styles = StyleSheet.create({
  modal: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 16,
    width: '90%',
    maxHeight: '80%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: typography.h2.fontSize,
    fontFamily: typography.h2.fontFamily,
    color: colors.black,
    marginLeft: 10,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: typography.h3.fontSize,
    fontFamily: typography.h3.fontFamily,
    color: colors.black,
    marginBottom: 8,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 16,
    marginBottom: 8,
    borderColor: colors.silver,
    borderWidth: 1,
  },
  expandedCard: {
    backgroundColor: colors.white,
  },
  expandedTitle: {
    fontSize: typography.h2.fontSize,
    fontFamily: typography.h3.fontFamily,
    color: colors.resolutionBlue,
    textAlign: 'center', // Centre le texte
    marginBottom: 8, // Ajoute un espacement
  },

  cardTitle: {
    fontSize: typography.h4.fontSize,
    fontFamily: typography.h4.fontFamily,
    marginBottom: 8,
    color: colors.resolutionBlue,
  },
  centeredCardTitle: {
    textAlign: 'center', // Centre le texte horizontalement
    alignSelf: 'center', // Centre par rapport au conteneur
    marginBottom: 8, // Espacement en dessous
  },

  expandedCardTitle: {
    textAlign: 'center', // Centrer le texte si étendu
    marginBottom: 16, // Ajouter un espacement supplémentaire si nécessaire
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  cardContentLeft: {
    alignItems: 'flex-end', // Aligne les éléments à droite
    flexDirection: 'column', // Place les éléments en colonne
    marginBottom: 8, // Ajoute un espacement sous les informations
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
    flexWrap: 'nowrap', // Empêche de passer à la ligne
    width: '50%',
  },
  detailText: {
    fontSize: typography.h3.fontSize,
    fontFamily: typography.h3.fontFamily,
    color: colors.resolutionBlue,
    marginLeft: 4, // Rapproche le texte de l'icône
  },
  expandedContent: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: colors.silver,
    flexDirection: 'row',
  },
  qrCodeContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
  qrCodeImage: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
});
