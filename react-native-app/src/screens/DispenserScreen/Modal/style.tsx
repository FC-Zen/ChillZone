import { colors, typography } from '@theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  image: {
    width: '100%',
    height: 198,
    resizeMode: 'cover',
    marginBottom: 18,
    borderRadius: 16,
    marginTop: 19,
  },
  price: {
    fontSize: typography.h2.fontSize,
    fontFamily: typography.h1.fontFamily,
    marginBottom: 18,
  },
  subtitle: {
    fontSize: typography.h3.fontSize,
    fontFamily: typography.h3.fontFamily,
    color: colors.black,
    marginBottom: 18,
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
  },
  contentContainer: {
    paddingTop: 19,
    flex: 1,
  },
  btnContainer: {
    paddingBottom: 30,
    alignItems: 'center',
  },
});
