import { colors, typography } from '@theme';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 40,
  },
  title: {
    fontSize: typography.h2.fontSize,
    color: colors.black,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default styles;
