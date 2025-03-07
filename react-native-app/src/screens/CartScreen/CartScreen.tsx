import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { styles } from './style';
import { useTranslation } from 'react-i18next';
import { CartTemplate, SnackBar } from '@components';
import { API_URL } from '@env';
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
  
  const [openTime, setOpenTime] = useState(restaurant.opening_time);
  const [closedTime, setClosedTime] = useState(restaurant.closing_time);

  const [snackbar, setSnackbar] = useState<{
      open: boolean;
      severity: 'success' | 'error';
      message: string;
  }>({
      open: false,
      severity: 'success',
      message: '',
  });

  
  // 8:30 to 8.5
  const formatTime = (time: string) => {
    const [hour, minute] = time.split(':').map(Number);
    return hour + minute / 60;
  };
  
  const [cartItems, updateCartItems] = useState<ItemProps[]>([]);
  const [selectedSlot, setSelectedSlot] = useState(false);
  
  const [pickupSlot, setPickupSlot] = useState<SlotTime>({
    startTime: 0, 
    endTime: 0,
  });
  
  const [fixedPickupSlot, setFixedPickupSlot] = useState<SlotTime>({
    startTime: 0,
    endTime: 0,
  });
  
  const adjustSlotsTime = (openingTime: string, closingTime: string) => {
    const [openHour] = openingTime.split(':').map(Number);
    const [closeHour] = closingTime.split(':').map(Number);
    const actualDate = new Date();
    const actualHour = actualDate.getHours();

    if (actualHour >= openHour && actualHour < closeHour) {
      setPickupSlot({
        startTime: actualHour,
        endTime: actualHour + 1,
      });
      setFixedPickupSlot({
        startTime: actualHour,
        endTime: actualHour + 1,
      });
    } else {
      setPickupSlot({
        startTime: openHour,
        endTime: openHour + 1,
      });
      setFixedPickupSlot({
        startTime: openHour,
        endTime: openHour + 1,
      });
    }
  };

  const restaurantImage = `${API_URL}${restaurant.photo_link}`;
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
    if (cartItems.length !== 0) {
      navigation.navigate(ROUTE.PAYMENT, {
        restaurantId,
        pickupTime: avgPickupTime(),
      });
    } else {
      setSnackbar({
        open: true,
        severity: 'error',
        message: t('cart.empty'),
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchCartItems();
    };
    fetchData();
    adjustSlotsTime(openTime, closedTime);
  }, []);

  return (
    <View style={styles.container}>
      <SnackBar
        visible={snackbar.open}
        message={snackbar.message}
        onDismiss={() => setSnackbar({ ...snackbar, open: false })}
        severity={snackbar.severity}
      />
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
            pickupSlot.endTime < formatTime(closedTime) &&
              setPickupSlot({
                startTime: pickupSlot.startTime + 1,
                endTime: pickupSlot.endTime + 1,
              });
          },
          onLess: () => {
            pickupSlot.startTime > formatTime(openTime) && pickupSlot.startTime >= fixedPickupSlot.endTime &&
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
