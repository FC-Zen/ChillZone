import { AllOrders, Order } from '@services';

export const getLastOrder = (allCommands: AllOrders): Order => {
  let today_orders = allCommands.today_orders;
  for (let i = 0; i < today_orders.length; i++) {
    console.log('today_orders[i].id : ', today_orders[i].id);
  }
  return today_orders[today_orders.length - 1];
};
