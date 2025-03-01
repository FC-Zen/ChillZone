import "@testing-library/jest-native/extend-expect";
import 'react-native-gesture-handler/jestSetup';

jest.mock('react-native-reanimated', () => require('react-native-reanimated/mock'));

jest.mock('expo-font', () => ({
  loadAsync: jest.fn(),
}));

jest.mock('expo-modules-core', () => ({
  EventEmitter: jest.fn(),
}));