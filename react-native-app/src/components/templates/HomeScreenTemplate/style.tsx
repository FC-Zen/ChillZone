import { typography } from '@theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    width: '100%',
  },
  headerText: {
    fontSize: typography.h2.fontSize,
    textAlign: 'center',
  },
  boldText: {
    fontWeight: 'bold',
  },
  scrollContainer: {
    paddingBottom: 100,
  },
});
