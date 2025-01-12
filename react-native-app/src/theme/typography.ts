import { TextStyle } from 'react-native';
import { loadAsync } from 'expo-font';

export const loadFonts = async () => {
  await loadAsync({
    'Montserrat-Regular': require('../assets/fonts/Montserrat-Regular.ttf'),
    'Montserrat-Bold': require('../assets/fonts/Montserrat-Bold.ttf'),
    'Montserrat-SemiBold': require('../assets/fonts/Montserrat-SemiBold.ttf'),
    'Montserrat-Medium': require('../assets/fonts/Montserrat-Medium.ttf'),
    'Montserrat-ExtraBold': require('../assets/fonts/Montserrat-ExtraBold.ttf'),
  });
};

loadFonts();

export const fonts = {
  regular: 'Montserrat-Regular',
  bold: 'Montserrat-Bold',
  semiBold: 'Montserrat-SemiBold',
  medium: 'Montserrat-Medium',
  extraBold: 'Montserrat-ExtraBold',
};

type TypographyKey =  'title1' | 'h1' | 'h2' | 'h3' | 'h4';

export const typography: {
  [key in TypographyKey]: TextStyle;
} = {
  //**   TITLE   **//
  title1: {
    fontFamily: fonts.bold,
    fontSize: 48,
    lineHeight: 56,
  },
  h1: {
    fontFamily: fonts.bold,
    fontSize: 32,
    lineHeight: 38,
  },
  h2: {
    fontFamily: fonts.semiBold,
    fontSize: 24,
    lineHeight: 28,
  },
  h3: {
    fontFamily: fonts.medium,
    fontSize: 16,
    lineHeight: 24,
  },
  h4: {
    fontFamily: fonts.regular,
    fontSize: 14,
    lineHeight: 20,
  },
};
