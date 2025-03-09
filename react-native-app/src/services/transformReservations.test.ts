import { transformReservations } from './transformReservations';

describe('transformReservations', () => {
  it('transforms reservations', async () => {
    const transformedReservations = await transformReservations();
    expect(transformedReservations).toBeInstanceOf(Array);
  });
});
