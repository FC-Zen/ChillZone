import { colors, layout } from '@theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  //Style du conteneur principale pour la page de Faq
  container: {
    width: layout.screen.width,
    height: layout.screen.height,
    backgroundColor: colors.white,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 70,
    gap: 35,
  },
});
