import { colors } from '@theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 'auto',
    paddingHorizontal: '3%',
    paddingVertical: '4%',
    borderWidth: 1,
    borderColor: '#BBB',
    backgroundColor: '#FFF',
    gap: 10,
  },
  iconContainer: {
    width: 50,
    height: 50,
    padding: 13,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: colors.resolutionBlue,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  title: {
    width: 190,
    color: colors.resolutionBlue,
    fontFamily: 'Montserrat',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
  },
  message: {
    width: '100%',
    maxHeight: 40,
    color: '#000',
    fontFamily: 'Montserrat',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
  },
  time: {
    color: '#000',
    fontFamily: 'Montserrat',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 18,
  },
});
