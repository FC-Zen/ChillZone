import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ToggleSwitch } from './ToggleSwitch';
import { colors } from '@theme';

describe('ToggleSwitch Component', () => {
  it('renders correctly with initial value', () => {
    const { getByRole } = render(
      <ToggleSwitch value={false} onToggle={() => {}} />
    );
    const switchElement = getByRole('switch');
    expect(switchElement.props.value).toBe(false);
  });

  it('calls onToggle when switched', () => {
    const mockOnToggle = jest.fn();
    const { getByRole } = render(
      <ToggleSwitch value={false} onToggle={mockOnToggle} />
    );
    const switchElement = getByRole('switch');

    fireEvent(switchElement, 'valueChange', true);
    expect(mockOnToggle).toHaveBeenCalledWith(true);
  });

  it('applies correct styles for light theme when off', () => {
    const { getByTestId } = render(
      <ToggleSwitch value={false} onToggle={() => {}} />
    );
    const container = getByTestId('toggle-switch-container');
    expect(container.props.style).toContainEqual({
      backgroundColor: colors.white,
    });
  });

  it('applies correct styles for light theme when on', () => {
    const { getByTestId } = render(
      <ToggleSwitch value={true} onToggle={() => {}} />
    );
    const container = getByTestId('toggle-switch-container');
    expect(container.props.style).toContainEqual({
      backgroundColor: colors.darkCyan,
    });
  });

  it('applies correct styles for dark theme when off', () => {
    const { getByTestId } = render(
      <ToggleSwitch value={false} onToggle={() => {}} isDarkTheme={true} />
    );
    const container = getByTestId('toggle-switch-container');
    expect(container.props.style).toContainEqual({
      backgroundColor: colors.darkCyan,
    });
  });

  it('applies correct styles for dark theme when on', () => {
    const { getByTestId } = render(
      <ToggleSwitch value={true} onToggle={() => {}} isDarkTheme={true} />
    );
    const container = getByTestId('toggle-switch-container');
    expect(container.props.style).toContainEqual({
      backgroundColor: colors.white,
    });
  });
});
