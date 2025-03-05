import React, { useState } from 'react';
import { View, Text, Image } from 'react-native';
import { Button, Counter, PageHeader } from '@components';
import { useNavigation } from '@hooks';
import { styles } from './style';
import { useTranslation } from 'react-i18next';
import { useCommand } from '@contexts';
import { MealProps } from '@services/DispenserServices';
import { SnackBar } from '@components';

type ModalScreenProps = {
  route: {
    params: {
      meal: MealProps;
    };
  };
};

export const DispenserModal: React.FC<ModalScreenProps> = ({ route }) => {
  const { meal } = route.params;
  const [quantity, setQuantity] = useState(1);
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { listItems, updateListItems } = useCommand();

  const [snackbar, setSnackbar] = useState<{
    isAvailable: boolean;
    severity: 'success' | 'error';
    message: string;
  }>({
    isAvailable: false,
    severity: 'success',
    message: '',
  });

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    if (meal.stock === 0) {
      console.log("Ce plat n'est plus disponible !");
      setSnackbar({
        isAvailable: true,
        severity: 'error',
        message: "Nous n'avons plus de stock, désolé !",
      });
      return;
    }

    const price = meal.price;
    console.log(
      `Ajouté au panier: ${meal.name}, Quantité: ${quantity}, Total : ${(price * quantity).toFixed(2)} €`
    );

    if (listItems.find((item) => item.name === meal.name)) {
      listItems.map((item) => {
        if (item.name === meal.name) {
          item.quantity += quantity;
        }
      });
    } else {
      updateListItems([
        ...listItems,
        {
          id: meal.id,
          name: meal.name,
          price: meal.price,
          type: 'meal',
          quantity: quantity,
          onDecrement: handleDecrement,
          onIncrement: handleIncrement,
          onDelete: () => {
            listItems.filter((item) => item.name !== meal.name);
          },
        },
      ]);
    }

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <PageHeader
        title={meal.name}
        variant="back"
        onBackPress={() => navigation.goBack()}
      />

      <SnackBar
        visible={snackbar.isAvailable}
        message={snackbar.message}
        onDismiss={() => setSnackbar({ ...snackbar, isAvailable: false })}
        severity={snackbar.severity}
      />
      <View style={styles.contentContainer}>
        <Image source={{ uri: meal.photo_link }} style={styles.image} />
        <Text style={styles.price}>{meal.price} €</Text>
        <Text style={styles.subtitle}>{meal.description}</Text>

        <View style={styles.counterContainer}>
          <Counter
            quantity={quantity}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
          />
        </View>
      </View>

      <View style={styles.btnContainer}>
        <Button
          title={t('buttons.add.generic', { x: quantity })}
          onPress={handleAddToCart}
        />
      </View>
    </View>
  );
};
