import { StyleSheet } from 'react-native';
import { colors, layout, typography } from '@theme';

export const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: '100%',
    height: layout.window.height * 0.3,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: colors.white,
    borderColor: colors.resolutionBlue,
    borderWidth: 4,
    elevation: 5,
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 200,
    position: 'absolute',
    top: 0,
  },
  content: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 10,
    backgroundColor: colors.resolutionBlue,
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
  iconRow: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  iconContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
  iconLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    textAlign: 'center',
    fontFamily: typography.h3.fontFamily,
    color: colors.white,
    fontSize: typography.h3.fontSize,
    marginLeft: 5,
  },
  noReservation: {
    fontFamily: typography.h2.fontFamily,
    color: colors.white,
    fontSize: typography.h3.fontSize,
    textAlign: 'center',
  },
});
