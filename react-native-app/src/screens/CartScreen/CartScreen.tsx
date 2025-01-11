import { PickupSlot } from "@components/molecules/PickupSlot";
import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { styles } from "./style";
import { useTranslation } from "react-i18next";
import { Separation } from "@components/atoms";
import { layout } from "@theme";
import { getAllMeals, getAllMenus, MenuProps } from "@services";
import { MealProps } from "@services/DispenserServices";
import { CartTemplate } from "@components";
import { ImagesMap } from "@utils";
import { ItemProps } from "@components/organisms";
import { useNavigation } from "@hooks";
import { ROUTE } from "@enums";

export type SlotTime = {
    startTime: number;
    endTime: number;
};

export const CartScreen = () => {
    const { t } = useTranslation();

    const [cartItems, updateCartItems] = useState<ItemProps[]>([]);
    const [pickupSlot, setPickupSlot] = useState<SlotTime>({ startTime: 10, endTime: 11 });
    const [fixedPickupSlot] = useState<SlotTime>({ startTime: 10, endTime: 11 });
    const [selectedSlot, setSelectedSlot] = useState(false);
    const [meals, setMeals] = useState<MealProps[]>([]);
    const [menus, setMenus] = useState<MenuProps[]>([]);
    const [openTime, setOpenTime] = useState(10);
    const [closedTime, setClosedTime] = useState(20);
    const restaurantImage = ImagesMap['restaurant_image.png'];

    const navigation = useNavigation();
    

    const removeItemFromCart = (itemName: string) => {
        console.log('Avant suppression:', cartItems);
        updateCartItems((prevCartItems) => {
            const newCart = prevCartItems.filter((cartItem) => cartItem.name !== itemName);
            console.log('Après suppression:', newCart);
            return newCart;
        });
    };
    

    const addQuantity = (itemName: string) => {
        updateCartItems((prevCartItems) =>
            prevCartItems.map((cartItem) => {
                if (cartItem.name === itemName) {
                    return { ...cartItem, quantity: cartItem.quantity + 1 };
                }
                return cartItem;
            })
        );
    };

    const removeQuantity = (itemName: string) => {
        updateCartItems(cartItems.map((cartItem) => {
            if (cartItem.name === itemName) {
                cartItem.quantity -= 1;
            }
            return cartItem;
        }));
    };

    const fetchMeals = async () => {
        try {
            const mealData = await getAllMeals();
            setMeals(mealData);
    
            const updatedCartItems = mealData.map((meal) => ({
                id: meal.id,
                name: meal.title,
                type: meal.meal_type,
                price: meal.price,
                quantity: 1,
                onIncrement: () => addQuantity(meal.title),
                onDecrement: () => removeQuantity(meal.title),
                onDelete: () => removeItemFromCart(meal.title),
            }));
    
            updateCartItems(updatedCartItems);
        } catch (error) {
            console.error("Erreur lors de la récupération des repas :", error);
        }
    };
    
    const fetchMenus = async () => {
        try {
            const menuData = await getAllMenus();
            const updatedCartItems = menuData.map((menu) => ({
                id: menu.id,
                name: menu.name,
                type: 'menu',
                price: parseFloat(menu.price.replace('€', '')),
                quantity: 1,
                meals: menu.meals.map((meal) => meal.title),
                onIncrement: () => addQuantity(menu.name),
                onDecrement: () => removeQuantity(menu.name),
                onDelete: () => removeItemFromCart(menu.name),
            })); 
    
            updateCartItems((prevCartItems) => [...prevCartItems, ...updatedCartItems]);
        } catch (error) {
            console.error("Erreur lors de la récupération des menus :", error);
        }
    };

    const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    

    useEffect(() => {
        const fetchData = async () => {
            await fetchMeals();
            await fetchMenus();
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
                totalPrice={`${totalAmount.toFixed(2)}€`}
                standardSlot={{
                    text: t('cart.standard'),
                    startTime: fixedPickupSlot.startTime,
                    endTime: fixedPickupSlot.endTime,
                    selected: selectedSlot,
                    onSelect: () => { !selectedSlot && setSelectedSlot(!selectedSlot) },
                }}
                customSlot={{
                    text: t('cart.timed'),
                    startTime: pickupSlot.startTime,
                    endTime: pickupSlot.endTime,
                    selected: !selectedSlot,
                    variant: 'counter',
                    onSelect: () => { selectedSlot && setSelectedSlot(!selectedSlot) },
                    onAdd: () => { pickupSlot.endTime < closedTime && setPickupSlot({ startTime: pickupSlot.startTime + 1, endTime: pickupSlot.endTime + 1 }) },
                    onLess: () => { pickupSlot.startTime > openTime && setPickupSlot({ startTime: pickupSlot.startTime - 1, endTime: pickupSlot.endTime - 1 }) },
                }}
                payButtonTitle={t('buttons.actions.payNow')}
                onPayBtnPress={() => navigation.navigate(ROUTE.PAYMENT)}
            />
        </View>
    );
};