import { StyleSheet } from 'react-native';
import { colors, layout, typography } from '@theme';

export const styles = StyleSheet.create({
  modalBackground: {
    width: layout.screen.width,
    height: layout.screen.height,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '90%',
    backgroundColor: colors.resolutionBlue,
    borderRadius: 20,
    paddingVertical: 20,
    gap: 10,
  },
  header: {
    width: '100%',
    paddingBottom: 0,
  },
  stepText: {
    fontFamily: typography.h2.fontFamily,
    fontSize: typography.h3.fontSize,
    color: colors.white,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  image: {
    width: '90%',
    maxHeight: 200,
    resizeMode: 'contain',
    alignSelf: 'center',
    paddingVertical: 10,
  },
  finalText: {
    fontFamily: typography.h3.fontFamily,
    fontSize: typography.h4.fontSize,
    color: colors.white,
    textAlign: 'center',
    marginTop: 10,
    fontStyle: 'italic',
  },
});
