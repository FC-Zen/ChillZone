import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Navigation } from './Navigation';

describe('Navigation', () => {
  it('navigates to correct screen', () => {
    const { getByText } = render(<Navigation />);
    fireEvent.press(getByText('Go to Details'));
    expect(getByText('Details Screen')).toBeTruthy();
  });

  it('back to home screen', () => {
    const { getByText } = render(<Navigation />);
    fireEvent.press(getByText('Go to Details'));
    fireEvent.press(getByText('Back to Home'));
    expect(getByText('Home Screen')).toBeTruthy();
  });
});
