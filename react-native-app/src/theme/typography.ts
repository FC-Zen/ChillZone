import { TextStyle } from 'react-native';

// example to change
export const fonts = {
  PoppinsRegular: 'Poppins-Regular',
  PoppinsSemiBold: 'Poppins-SemiBold',
  PoppinsBold: 'Poppins-Bold',
  PoppinsExtraBold: 'Poppins-ExtraBold',
};

type TypographyKey =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'body1'
  | 'body2'
  | 'body3'
  | 'body4'
  | 'display1'
  | 'display2'
  | 'display3'
  | 'display4'
  | 'button1'
  | 'button2';

export const typography: {
  [key in TypographyKey]: TextStyle;
} = {
  //**   TITLE   **//
  h1: {
    fontFamily: fonts.PoppinsSemiBold,
    fontSize: 30,
    lineHeight: 36,
  },
  h2: {
    fontFamily: fonts.PoppinsBold,
    fontSize: 24,
    lineHeight: 32,
  },
  h3: {
    fontFamily: fonts.PoppinsSemiBold,
    fontSize: 20,
    lineHeight: 28,
  },
  h4: {
    fontFamily: fonts.PoppinsSemiBold,
    fontSize: 18,
    lineHeight: 26,
  },

  //**   BODY   **//
  body1: {
    fontFamily: fonts.PoppinsRegular,
    fontSize: 16,
    lineHeight: 22,
  },
  body2: {
    fontFamily: fonts.PoppinsRegular,
    fontSize: 14,
    lineHeight: 20,
  },
  body3: {
    fontFamily: fonts.PoppinsRegular,
    fontSize: 12,
    lineHeight: 18,
  },
  body4: {
    fontFamily: fonts.PoppinsRegular,
    fontSize: 10,
    lineHeight: 14,
  },

  //**   DISPLAY   **//
  display1: {
    fontFamily: fonts.PoppinsSemiBold,
    fontSize: 50,
    lineHeight: 70,
  },
  display2: {
    fontFamily: fonts.PoppinsSemiBold,
    fontSize: 40,
    // TODO: UI - no auto
    lineHeight: 50, // ? which size to replace 'auto'
  },
  display3: {
    fontFamily: fonts.PoppinsExtraBold,
    fontSize: 36,
    lineHeight: 46,
  },
  display4: {
    fontFamily: fonts.PoppinsExtraBold,
    fontSize: 18,
    lineHeight: 22,
  },

  //**   BUTTON   **//
  button1: {
    fontFamily: fonts.PoppinsBold,
    fontSize: 18,
    lineHeight: 24,
  },
  button2: {
    fontFamily: fonts.PoppinsBold,
    fontSize: 14,
    lineHeight: 24,
  },
};

export type Typography = keyof typeof typography;

export const typographyExtra = {
  logo: {
    fontSize: 43,
  },
  logo2: {
    fontSize: 31,
  },
  logo3: {
    fontSize: 27,
  },
  logo4: {
    fontSize: 24,
  },
};