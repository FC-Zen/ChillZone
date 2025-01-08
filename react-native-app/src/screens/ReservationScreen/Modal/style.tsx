import { StyleSheet } from 'react-native';
import { colors, typography } from '@theme';

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
  },
  modalTitle: {
    color: colors.white,
    fontSize: typography.h2.fontSize,
    fontFamily: typography.h2.fontFamily,
    textAlign: 'center',
  },
  roomInfo: {
    padding: 15,
  },
  textStyle: {
    fontSize: typography.h3.fontSize,
    fontFamily: typography.h3.fontFamily,
    color: colors.white,
  },
  mapContainer: {
    width: 125,
    height: 125,
    borderRadius: 10,
    display: 'flex',
    alignSelf: 'center',
    marginVertical: 15,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
    gap: 10,
  },
  flexContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    gap: 10,
  },

  flexItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
});
