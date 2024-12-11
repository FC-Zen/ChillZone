import { colors, typography } from '@theme';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: typography.h2.fontSize,
    color: colors.black,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  txt: {
    fontSize: typography.h2.fontSize,
    color: colors.black,
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default styles;
