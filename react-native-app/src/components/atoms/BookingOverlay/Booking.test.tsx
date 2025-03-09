import React from 'react';
import { render } from '@testing-library/react-native';
import { BookingOverlay } from './BookingOverlay';

describe('BookingOverlay Component', () => {
  it('renders component', () => {
    const { getByText } = render(<BookingOverlay />);
    expect(getByText('Booking Overlay')).toBeTruthy();
  });

  it('transforms reservations', async () => {
    const transformedReservations = await transformReservations();
    expect(transformedReservations).toBeInstanceOf(Array);
  });
});
