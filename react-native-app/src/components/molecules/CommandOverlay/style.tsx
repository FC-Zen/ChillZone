import { StyleSheet } from 'react-native';
import { colors, typography } from '@theme';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 25,
  },
  overlayBox: {
    width: '100%',
    backgroundColor: colors.white,
    borderRadius: 20,
    shadowColor: colors.black,
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  expandedContainer: {
    paddingVertical: 20,
  },
  headerRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    height: 'auto',
    paddingHorizontal: 20,
    gap: 10,
  },
  rightColumn: {
    width: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  previewText: {
    color: colors.resolutionBlue,
    fontSize: typography.h3.fontSize,
    fontFamily: typography.h3.fontFamily,
    marginVertical: 5,
  },
  expandedContent: {
    alignItems: 'center',
    paddingHorizontal: 44,
  },
  titleText: {
    fontSize: typography.h2.fontSize,
    fontFamily: typography.h2.fontFamily,
    color: colors.resolutionBlue,
    marginBottom: 10,
    textAlign: 'center',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginVertical: 10,
    borderColor: colors.resolutionBlue,
    borderWidth: 1,
  },
  detailsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 0,
    gap: 10,
  },
  closeButton: {
    backgroundColor: 'transparent',
    marginTop: 9,
    paddingVertical: 5,
    borderRadius: 50,
    borderColor: colors.warn,
    borderWidth: 2,
  },
});
