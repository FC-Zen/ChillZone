import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 86,
    paddingHorizontal: 27,
    paddingVertical: 21,
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
    backgroundColor: '#2E2A85',
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  title: {
    width: 190,
    color: '#2E2A85',
    fontFamily: 'Montserrat',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
  },
  message: {
    width: 272,
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