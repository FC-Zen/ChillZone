import { StyleSheet } from 'react-native';
import { colors } from '@theme';

export const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  lightContainer: {
    backgroundColor: '#fff',
    padding: 20,
  },
  darkContainer: {
    backgroundColor: '#333',
    padding: 20,
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
