import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ReservationSummaryScreen } from './ReservationSummaryScreen';

describe('ReservationSummaryScreen', () => {
  it('handles cancel reservation', () => {
    const { getByText } = render(<ReservationSummaryScreen />);
    fireEvent.press(getByText('buttons.actions.cancelReservation'));
    expect(getByText('La réservation a été annulée avec succès')).toBeTruthy();
  });

  it('groups reservations', () => {
    const { getByText } = render(<ReservationSummaryScreen />);
    expect(getByText('recap.reservationTitle')).toBeTruthy();
  });
});
