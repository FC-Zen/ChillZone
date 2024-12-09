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
    padding: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: colors.darkCyan,
    backgroundColor: colors.white,
  },
  checked: {
    backgroundColor: colors.darkCyan,
  },
  checkmark: {
    color: colors.white,
    fontSize: 12,
  },
  label: {
    fontSize: typography.h3.fontSize,
    marginLeft: 10,
    color: '#000',
  },
});

export default styles;
