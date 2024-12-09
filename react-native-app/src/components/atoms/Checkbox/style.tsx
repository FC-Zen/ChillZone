import { StyleSheet } from 'react-native';
import { colors, typography } from '@theme';

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Centrer le contenu horizontalement
  },
  checkbox: {
    display: 'flex',
    width: 16,
    height: 16,
    padding: 0,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
    borderWidth: 1,
    borderColor: colors.darkCyan,
    backgroundColor: colors.white,
  },
  checked: {
    backgroundColor: colors.darkCyan,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    fontSize: 10,
    color: colors.white,
    textAlign: 'center',
  },
  label: {
    fontSize: typography.h3.fontSize,
    marginLeft: 10,
    color: colors.black,
  },
});

export default styles;
