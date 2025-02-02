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
});
