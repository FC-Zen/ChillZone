import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { styles } from './style';
import { useTranslation } from 'react-i18next';
import { CartTemplate } from '@components';
import { ImagesMap } from '@utils';
import { ItemProps } from '@components/organisms';
import { useNavigation } from '@hooks';
import { ROUTE } from '@enums';
import { useCommand } from '@contexts';
import { RestaurantData } from '@services';

export type SlotTime = {
  startTime: number;
  endTime: number;
};

type CardScreenProps = {
  route: {
    params: {
      restaurant: RestaurantData;
    };
  };
};

export const CartScreen: React.FC<CardScreenProps> = ({ route }) => {
  const { restaurant } = route.params;
  const restaurantId = restaurant.id;
  const restaurantName = restaurant.name;
  const { t } = useTranslation();

  const adjustOpening = (openingTime: string, closingTime: string) => {
    const [openHour, openMinute] = openingTime.split(':').map(Number);
    const [closeHour, closeMinute] = closingTime.split(':').map(Number);
    const actualDate = new Date();
    const actualHour = actualDate.getHours();
    const actualMinute = actualDate.getMinutes();

    console.log('Dans CartScreen : ');
    console.log('actualHour : ', actualHour);
    console.log('actualMinute : ', actualMinute);
    if (actualHour > closeHour || actualHour < openHour) {
      return openHour;
    }
    if (
      (actualHour > openHour && actualHour < closeHour) ||
      (actualHour === openHour && actualMinute > openMinute) ||
      (actualHour === closeHour && actualMinute < closeMinute)
    ) {
      return actualHour;
    } else if (actualHour < openHour) {
      return openHour;
    }
    return openHour;
  };

  const adjustClosing = (closingTime: string) => {
    const [closeHour, closeMinute] = closingTime.split(':').map(Number);
    const actualDate = new Date();
    const actualHour = actualDate.getHours();
    const actualMinute = actualDate.getMinutes();

    if (actualHour > closeHour) {
      return closeHour;
    }
    if (actualHour === closeHour && actualMinute > closeMinute) {
      return closeHour;
    }
    return closeHour;
  };

  // 8:30 to 8.5
  const formatTime = (time: string) => {
    const [hour, minute] = time.split(':').map(Number);
    return hour + minute / 60;
  };

  const [cartItems, updateCartItems] = useState<ItemProps[]>([]);
  const [selectedSlot, setSelectedSlot] = useState(false);
  const [closedTime, setClosedTime] = useState(
    adjustClosing(restaurant.closing_time)
  );
  const [openTime, setOpenTime] = useState(
    adjustOpening(restaurant.opening_time, restaurant.closing_time)
  );

  const [pickupSlot, setPickupSlot] = useState<SlotTime>({
    startTime: openTime,
    endTime: closedTime,
  });

  const [fixedPickupSlot] = useState<SlotTime>({
    startTime: openTime,
    endTime: closedTime,
  });

  const restaurantImage = ImagesMap['restaurant_image.png']; // modifier ça
  const { listItems, updateListItems, totalAmount, setTotalAmount } =
    useCommand();

  const navigation = useNavigation();

  const removeItemFromCart = (itemName: string) => {
    updateCartItems((prevCartItems) => {
      const newCart = prevCartItems.filter(
        (cartItem) => cartItem.name !== itemName
      );
      updateListItems(newCart);
      return newCart;
    });
  };

  const addQuantity = (itemName: string) => {
    updateCartItems((prevCartItems) => {
      const newCart = prevCartItems.map((cartItem) => {
        if (cartItem.name === itemName) {
          cartItem.quantity += 1;
        }
        return cartItem;
      });
      return newCart;
    });

    updateListItems(cartItems);
  };

  const removeQuantity = (itemName: string) => {
    updateCartItems((prevCartItems) => {
      const newCart = prevCartItems.map((cartItem) => {
        if (cartItem.name === itemName) {
          cartItem.quantity -= 1;
        }
        return cartItem;
      });
      return newCart;
    });

    updateListItems(cartItems);
  };

  const fetchCartItems = async () => {
    try {
      const menuData = listItems;
      const updatedCartItems = menuData.map((menu) => ({
        id: menu.id,
        name: menu.name,
        type: 'menu',
        price: menu.price,
        quantity: menu.quantity,
        meals: menu.meals,
        onIncrement: () => addQuantity(menu.name),
        onDecrement: () => removeQuantity(menu.name),
        onDelete: () => removeItemFromCart(menu.name),
      }));

      updateCartItems(updatedCartItems);
    } catch (error) {
      console.error('Erreur lors de la récupération des menus :', error);
    }
  };

  const calcTotalAmount = () => {
    let amount = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotalAmount(amount);
    return amount;
  };

  const avgPickupTime = () => {
    if ((pickupSlot.startTime - fixedPickupSlot.startTime) % 2 === 0) {
      return `${pickupSlot.startTime + 1}:00:00`;
    } else {
      return `${pickupSlot.startTime + 1}:30:00`;
    }
  };

  const onPay = () => {
    navigation.navigate(ROUTE.PAYMENT, {
      restaurantId,
      pickupTime: avgPickupTime(),
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchCartItems();
    };
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <CartTemplate
        headerTitle={t('headers.cart')}
        restaurantText={t('cart.restaurants', { res: 'Restaurant' })}
        restaurantImage={restaurantImage}
        commands={cartItems}
        commandTitle={t('cart.command')}
        collectTitle={t('cart.collectTime')}
        totalText={t('cart.total')}
        totalPrice={`${calcTotalAmount().toFixed(2)}€`}
        standardSlot={{
          text: t('cart.standard'),
          startTime: fixedPickupSlot.startTime,
          endTime: fixedPickupSlot.endTime,
          selected: selectedSlot,
          onSelect: () => {
            !selectedSlot && setSelectedSlot(!selectedSlot);
          },
        }}
        customSlot={{
          text: t('cart.timed'),
          startTime: pickupSlot.startTime,
          endTime: pickupSlot.endTime,
          selected: !selectedSlot,
          variant: 'counter',
          onSelect: () => {
            selectedSlot && setSelectedSlot(!selectedSlot);
          },
          onAdd: () => {
            pickupSlot.endTime < closedTime &&
              setPickupSlot({
                startTime: pickupSlot.startTime + 1,
                endTime: pickupSlot.endTime + 1,
              });
          },
          onLess: () => {
            pickupSlot.startTime > openTime &&
              setPickupSlot({
                startTime: pickupSlot.startTime - 1,
                endTime: pickupSlot.endTime - 1,
              });
          },
        }}
        payButtonTitle={t('buttons.actions.payNow')}
        onPayBtnPress={onPay}
      />
    </View>
  );
};
