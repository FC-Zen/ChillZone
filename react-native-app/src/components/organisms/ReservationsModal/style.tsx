import { StyleSheet } from 'react-native';
import { colors } from '@theme';

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: '90%',
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 20,
    maxHeight: '80%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  reservationCard: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  expandedCard: {
    backgroundColor: colors.silver,
  },
  room: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  detailText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 8,
  },
  expandedContent: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: colors.darkCyan,
  },
  cancelButton: {
    backgroundColor: colors.white,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignSelf: 'flex-start',
    borderColor: colors.warn,
    borderWidth: 1,
    marginTop: 10,
  },
  cancelButtonText: {
    color: colors.warn,
    fontWeight: 'bold',
  },
});

export default styles;
