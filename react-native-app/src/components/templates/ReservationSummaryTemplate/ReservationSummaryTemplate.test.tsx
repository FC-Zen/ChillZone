import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ReservationSummaryTemplate } from './ReservationSummaryTemplate';

describe('ReservationSummaryTemplate', () => {
  it('renders component', () => {
    const { getByText } = render(
      <ReservationSummaryTemplate headerTitle="Test Header" />
    );
    expect(getByText('Test Header')).toBeTruthy();
  });

  it('handles cancel reservation', () => {
    const onCancelReservationMock = jest.fn();
    const { getByText } = render(
      <ReservationSummaryTemplate
        onCancelReservation={onCancelReservationMock}
      />
    );
    fireEvent.press(getByText('buttons.actions.cancelReservation'));
    expect(onCancelReservationMock).toHaveBeenCalled();
  });

  it('handles back press', () => {
    const onBackPressMock = jest.fn();
    const { getByText } = render(
      <ReservationSummaryTemplate onBackPress={onBackPressMock} />
    );
    fireEvent.press(getByText('Back'));
    expect(onBackPressMock).toHaveBeenCalled();
  });
});
