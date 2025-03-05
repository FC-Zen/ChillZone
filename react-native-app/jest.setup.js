import 'react-native-gesture-handler/jestSetup';
import '@testing-library/jest-native/extend-expect';
// import 'react-native-reanimated/mock'
import { jest } from '@jest/globals';

// Mock des modules qui peuvent poser problème
jest.mock('react-native-reanimated', () => require('react-native-reanimated/mock'));

// Commenter ou supprimer cette ligne pour éviter l'erreur
// jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper', () => jest.fn());

jest.mock('expo-constants', () => ({
  manifest: {
    extra: {},
  },
}));

jest.mock('expo-modules-core', () => {
  const { View } = require('react-native');
  return {
    NativeModules: {
      ExpoModulesCore: {},
    },
    requireNativeViewManager: jest.fn().mockReturnValue(View),
  };
});
