import { StyleSheet } from 'react-native';
import { colors } from '@theme/index';

export const styles = StyleSheet.create({
  container: {
    marginHorizontal: 8,
    padding: 16,
    backgroundColor: colors.white,
    borderRadius: 10,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    width: '100%',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  bookingInfoContainer: {
    width: '100%',
  },
});
