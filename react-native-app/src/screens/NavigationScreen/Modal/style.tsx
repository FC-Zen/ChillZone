import { StyleSheet } from 'react-native';
import { colors, typography } from '@theme';

export const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalContent: {
    backgroundColor: colors.darkCyan,
    borderRadius: 16,
    padding: 20,
    width: '90%',
    alignItems: 'center',
  },

  modalTitle: {
    color: colors.white,
    fontSize: typography.h2.fontSize,
    fontFamily: typography.h2.fontFamily,
    textAlign: 'center',
    marginBottom: 20,
  },

  roomInfo: {
    padding: 15,
    width: '100%',
  },

  textStyle: {
    fontSize: typography.h3.fontSize,
    fontFamily: typography.h3.fontFamily,
    color: colors.white,
  },

  mapContainer: {
    width: 180,
    height: 180,
    borderRadius: 10,
    display: 'flex',
    alignSelf: 'center',
    marginVertical: 15,
  },

  flexContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    gap: 12,
  },

  flexItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginVertical: 10,
    justifyContent: 'center',
  },

  txt: {
    fontSize: typography.h3.fontSize,
    fontFamily: typography.h3.fontFamily,
    color: colors.white,
    textAlign: 'center',
  },
});
