const getWindow = () => {
  if (typeof window === 'undefined') {
    return {
      width: 0,
      height: 0,
    };
  }
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
};

const getScreen = () => {
  if (typeof window === 'undefined') {
    return {
      width: 0,
      height: 0,
    };
  }
  return {
    width: window.screen.width,
    height: window.screen.height,
  };
};

const getPixelRatio = (): number => {
  if (typeof window === 'undefined') {
    return 1;
  }
  return window.devicePixelRatio;
};

const pixelRatioFontScale = (): number => 1;
const scale = getPixelRatio();
const isHighScale = scale > 3.72;
const isMediumScale = scale > 2.87;

const space = {
  px: 1,
  '0': 0,
  '0.5': 2,
  '1': 4,
  '1.5': 6,
  '2': 8,
  '2.5': 10,
  '3': 12,
  '3.5': 14,
  '4': 16,
  '5': 20,
  '6': 24,
  '7': 28,
  '8': 32,
  '9': 36,
  '10': 40,
  '11': 44,
  '12': 48,
  '14': 56,
  '16': 64,
  '20': 80,
  '24': 96,
  '28': 112,
  '32': 128,
  '36': 144,
  '40': 160,
  '44': 176,
  '48': 192,
  '52': 208,
  '56': 224,
  '60': 240,
  '64': 256,
  '72': 288,
  '80': 320,
  '96': 384,
} as const;

const size = {
  ...space,
  auto: 'auto',
  full: '100%',
  '3xs': 224,
  '2xs': 256,
  xs: 320,
  sm: 384,
  md: 28,
  lg: 32,
  xl: 36,
  '2xl': 42,
  '3xl': 48,
  '4xl': 56,
  '5xl': 64,
  '6xl': 72,
  '7xl': 80,
  '8xl': 90,
} as const;

const radius = {
  none: 0,
  sm: 2,
  base: 4,
  md: 5,
  lg: 8,
  xl: 12,
  xxl: 16,
  xxxl: 24,
  xxxxl: 50,
  full: 9999,
} as const;

export const layout = {
  window: getWindow(),
  screen: getScreen(),
  pixelRatio: getPixelRatio,
  pixelRatioFontScale,
  isHighScale,
  isMediumScale,
  scale,
  isSmallDevice: getScreen().width < 375,
  isLargeDevice: getScreen().width > 375,
  radius,
  space,
  size: size,
  zIndex: {
    background: -10,
    default: 1,
    foreground: 20,
    appBar: 1100,
    veryForeground: 1150,
    drawer: 1200,
    modal: 1300,
    snackbar: 1400,
    tooltip: 1500,
    screenCover: 1600,
    splashScreen: 1600,
  },
} as const;

export type Ilayout = typeof layout;
