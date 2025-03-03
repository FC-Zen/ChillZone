import { PickupSlot } from '@components/molecules/PickupSlot';
import { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { styles } from './style';
import { useTranslation } from 'react-i18next';
import { Separation } from '@components/atoms';
import { layout } from '@theme';
import { MealProps } from '@services/DispenserServices';
import { CartTemplate } from '@components';
import { ImagesMap } from '@utils';
import { ItemProps } from '@components/organisms';
import { useNavigation } from '@hooks';
import { ROUTE } from '@enums';
import { useCommand } from '@contexts';
import { createCommand } from '@services/CommandServices';
import { RestaurantData } from '@services';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type SlotTime = {
  startTime: number;
  endTime: number;
};

type CardScreenProps = {
  route: {
    params: {
      restaurantId: RestaurantData['id'];
      restaurantName: RestaurantData['name'];
    };
  };
};

export const CartScreen: React.FC<CardScreenProps> = ({ route }) => {
  const { restaurantId, restaurantName } = route.params;
  const { t } = useTranslation();

  const [cartItems, updateCartItems] = useState<ItemProps[]>([]);
  const [pickupSlot, setPickupSlot] = useState<SlotTime>({
    startTime: 10,
    endTime: 11,
  });
  const [fixedPickupSlot] = useState<SlotTime>({ startTime: 10, endTime: 11 });
  const [selectedSlot, setSelectedSlot] = useState(false);
  const [openTime, setOpenTime] = useState(10);
  const [closedTime, setClosedTime] = useState(20);
  const restaurantImage = ImagesMap['restaurant_image.png'];
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

  const onPay = async () => {
    try {
      const command = {
        payment_method: 'Card',
        pickup_time: avgPickupTime(),
        lines: cartItems.map((item) => ({
          [item.id]: item.meals
            ? {
                quantity: item.quantity,
                menu: {
                  id: item.id,
                  meals: item.meals.map((meal) => meal.id),
                },
              }
            : {
                quantity: item.quantity,
                meal: item.id,
              },
        })),
      };

      const response = await createCommand(restaurantId, command);

      //await AsyncStorage.setItem('qrCode', response?.qrImagelink);
      navigation.navigate(ROUTE.PAYMENT, { qrcode: response?.qrcode });
    } catch (error) {
      console.error('createCommand error:', error);
    }
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
