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
    shadowOpacity: 0.25,
    shadowRadius: 4,
    paddingHorizontal: 44,
  },
  expandedContainer: {
    paddingVertical: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rightColumn: {
    alignItems: 'center',
  },
  previewText: {
    color: colors.resolutionBlue,
    fontSize: typography.h3.fontSize,
    fontFamily: typography.h3.fontFamily,
    marginBottom: 10,
  },
  expandedContent: {
    alignItems: 'center',
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
    marginHorizontal: 15,
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
