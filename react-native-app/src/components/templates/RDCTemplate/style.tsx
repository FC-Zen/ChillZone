import { colors } from '@theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  cont: {
    backgroundColor: colors.white,
    width: '100%',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 30,
  },
  image: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.black,
    width: 350,
    height: 530,
  },
  iconContainer: {
    position: 'absolute',
    bottom: -5,
    right: 0,
    width: '38%',
    paddingVertical: 6,
    backgroundColor: colors.resolutionBlue,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    paddingHorizontal: 10,
  },
});
