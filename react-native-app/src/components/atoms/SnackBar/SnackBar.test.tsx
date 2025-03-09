import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { SnackBar } from './SnackBar';

describe('SnackBar Component', () => {
  it('renders component', () => {
    const { getByText } = render(
      <SnackBar visible={true} message="Test Message" />
    );
    expect(getByText('Test Message')).toBeTruthy();
  });

  it('handles dismiss', () => {
    const onDismissMock = jest.fn();
    const { getByText } = render(
      <SnackBar
        visible={true}
        message="Test Message"
        onDismiss={onDismissMock}
      />
    );
    fireEvent.press(getByText('Test Message'));
    expect(onDismissMock).toHaveBeenCalled();
  });
});
