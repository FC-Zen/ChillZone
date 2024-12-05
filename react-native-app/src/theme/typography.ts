import { TextStyle } from 'react-native';

export const fonts = {
  Montserrat: 'Montserrat',
};

type TypographyKey = 'h1' | 'h2' | 'h3';

export const typography: {
  [key in TypographyKey]: TextStyle;
} = {
  //**   TITLE   **//
  h1: {
    fontFamily: fonts.Montserrat,
    fontSize: 32,
    lineHeight: 38,
  },
  h2: {
    fontFamily: fonts.Montserrat,
    fontSize: 24,
    lineHeight: 28,
  },
  h3: {
    fontFamily: fonts.Montserrat,
    fontSize: 16,
    lineHeight: 24,
  },
};
