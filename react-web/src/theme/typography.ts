import { useEffect } from 'react';

export type TextStyle = {
  fontFamily?: string;
  fontSize?: number;
  lineHeight?: number;
};

export const fonts = {
  regular: 'Montserrat-Regular',
  bold: 'Montserrat-Bold',
  semiBold: 'Montserrat-SemiBold',
  medium: 'Montserrat-Medium',
};

// Fichier CSS pour définir les polices
export const fontStyles = `
  @font-face {
    font-family: 'Montserrat-Regular';
    src: url('/assets/fonts/Montserrat-Regular.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Montserrat-Bold';
    src: url('/assets/fonts/Montserrat-Bold.ttf') format('truetype');
    font-weight: bold;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Montserrat-SemiBold';
    src: url('/assets/fonts/Montserrat-SemiBold.ttf') format('truetype');
    font-weight: 600;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Montserrat-Medium';
    src: url('/assets/fonts/Montserrat-Medium.ttf') format('truetype');
    font-weight: 500;
    font-style: normal;
    font-display: swap;
  }
`;

type TypographyKey = 'h1' | 'h2' | 'h3';

export const typography: {
  [key in TypographyKey]: TextStyle;
} = {
  h1: {
    fontFamily: fonts.regular,
    fontSize: 32,
    lineHeight: 3,
  },
  h2: {
    fontFamily: fonts.bold,
    fontSize: 24,
  },
  h3: {
    fontFamily: fonts.regular,
    fontSize: 16,
    lineHeight: 24,
  },
};

// Composant pour charger les polices
export const FontLoader = () => {
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = fontStyles;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return null;
};
