import React from 'react';
import { render } from '@testing-library/react-native';
import { BookingOverlay } from './BookingOverlay';

describe('BookingOverlay Component', () => {
  it('transforms reservations', async () => {
    const transformedReservations = await transformReservations();
    expect(transformedReservations).toBeInstanceOf(Array);
  });
});
