import React from 'react';
import renderer from 'react-test-renderer'; // Utiliser react-test-renderer
import { AccountScreen } from './AccountScreen';

describe('AccountScreen', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<AccountScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
