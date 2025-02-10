import { colors, typography } from '@theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    width: '100%',
  },
  navigationBarContainer: {
    position: 'absolute',
  },
  navBar: {
    flexDirection: 'row',
    width: '60%',
    backgroundColor: colors.resolutionBlue,
    alignItems: 'center',
    justifyContent: 'space-around',
    borderTopRightRadius: 8,
  },
  navItem: {
    color: colors.white,
    textAlign: 'center',
    fontFamily: typography.h3.fontFamily,
    fontSize: 12,
    paddingVertical: 9,
  },
  active: {
    fontFamily: typography.h1.fontFamily,
  },
  navBarBottom: {
    position: 'relative',
    bottom: -34,
  },
});
