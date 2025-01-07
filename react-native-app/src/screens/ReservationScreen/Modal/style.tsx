import { StyleSheet } from 'react-native';
import { colors } from '@theme';

export const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: colors.darkCyan,
    borderRadius: 16,
    padding: 20,
    width: '90%',
    maxWidth: 400,
  },
  modalTitle: {
    color: colors.white,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  roomInfo: {
    borderRadius: 12,
    padding: 15,
  },
  roomName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  mapContainer: {
    width: 125,
    height: 125,
    borderRadius: 10,
    display: 'flex',
    alignSelf: 'center',
  },
  reservationDetails: {
    gap: 10,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
    gap: 10,
  },
});
