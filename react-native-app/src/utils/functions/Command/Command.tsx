import { AllOrders, Order } from '@services';

export const getLastOrder = (allCommands: AllOrders): Order => {
  let today_orders = allCommands.today_orders;
  for (let i = 0; i < today_orders.length; i++) {
    //console.log('today_orders[i].id : ', today_orders[i].id);
  }
  return today_orders[today_orders.length - 1];
};

export const addOneHour = (time: string): string => {
  const [hours, minutes, seconds] = time.split(':').map(Number);
  const newHours = (hours + 1) % 24;
  //console.log(newHours);
  return `${newHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

export const formatTime = (time: string): string => {
  const [hours, minutes] = time.split(':').map(Number);
  return `${hours}h${minutes.toString().padStart(2, '0')}`;
};

export const formatDate = (dateTime: string): string => {
  return dateTime.split(' ')[0];
};