import { StyleSheet } from 'react-native';
import { colors, typography } from '@theme';

export const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: colors.darkCyan,
    borderRadius: 15,
  },
  title: {
    fontSize: typography.h3.fontSize,
    fontFamily: typography.h3.fontFamily,
    textAlign: 'center',
    color: colors.white,
    marginBottom: 10,
  },
  scrollContainer: {
    flexDirection: 'row',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 10,
    backgroundColor: colors.white,
    borderRadius: 20,
  },
  buttonActive: {
    backgroundColor: colors.resolutionBlue,
  },
  buttonText: {
    marginLeft: 5,
    color: colors.darkCyan,
    fontFamily: typography.h3.fontFamily,
  },
  buttonTextActive: {
    color: colors.white,
  },
  separator: {
    height: 1,
    backgroundColor: colors.white,
    marginVertical: 20,
    marginHorizontal: 20,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginHorizontal: 20,
  },
  roomImage: {
    width: 125,
    height: 125,
    borderRadius: 10,
    marginRight: 20,
  },
  infoContainer: {
    flex: 1,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  infoText: {
    marginLeft: 10,
    color: colors.white,
    fontSize: typography.h3.fontSize,
  },
});
