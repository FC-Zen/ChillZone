import { AllOrders, Order } from '@services';

export const getLastOrder = (allCommands: AllOrders): Order => {
  let today_orders = allCommands.today_orders;
  return today_orders[today_orders.length - 1];
};
