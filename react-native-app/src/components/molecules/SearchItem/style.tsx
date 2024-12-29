import { colors } from '@theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: 140,
    position: 'relative',
  },
  dropdown: {
    width: '100%',
    height: 48,
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: colors.white,
    borderRadius: 8,
    justifyContent: 'space-between', // Aligne texte et icône
    alignItems: 'center',
    flexDirection: 'row', // Texte et icône sur la même ligne
    borderWidth: 1,
    borderColor: colors.white,
  },
  dropdownText: {
    color: colors.silver,
    fontSize: 12,
  },
  icon: {
    marginLeft: 8, // Espacement entre le texte et l'icône
  },
  dropdownList: {
    position: 'absolute',
    top: 50,
    width: '100%',
    backgroundColor: colors.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.silver,
    zIndex: 1000,
  },
  option: {
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  optionText: {
    fontSize: 14,
    color: colors.black,
  },
});
