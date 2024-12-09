import { StyleSheet } from 'react-native';
import { colors, typography } from '@theme';

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
    marginBottom: 20,
  },
  checkboxContainer: {
    marginBottom: 20,
  },
  underlineText: {
    textDecorationLine: 'underline',
    color: colors.darkCyan,
    marginBottom: 40,
  },
});

export default styles;
