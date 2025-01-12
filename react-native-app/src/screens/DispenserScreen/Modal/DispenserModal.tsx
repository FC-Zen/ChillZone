import React, { useState } from 'react';
import { View, Text, Image } from 'react-native';
import { Button, Counter, PageHeader } from '@components';
import { useNavigation } from '@hooks';
import { styles } from './style';
import { useTranslation } from 'react-i18next';
import { useCommand } from '@contexts';

type ModalScreenProps = {
  route: {
    params: {
      meal: {
        id: number;
        title: string;
        subTitle: string;
        price: number;
        imageUrl: any;
      };
    };
  };
};

export const DispenserModal: React.FC<ModalScreenProps> = ({ route }) => {
  const { meal } = route.params;
  const [quantity, setQuantity] = useState(1);
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { listItems, updateListItems } = useCommand();

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    const price = meal.price;
    console.log(
      `Ajouté au panier: ${meal.title}, Quantité: ${quantity}, Total : ${(price * quantity).toFixed(2)} €`
    );
    if (listItems.find((item) => item.name === meal.title)) {
      listItems.map((item) => {
        if (item.name === meal.title) {
          item.quantity += quantity;
        }
      });
    }
    else {
      updateListItems([
        ...listItems,
        {
          id: meal.id,
          name: meal.title,
          price: meal.price,
          type: 'meal',
          quantity: quantity,
          onDecrement: handleDecrement,
          onIncrement: handleIncrement,
          onDelete: () => {
            listItems.filter((item) => item.name !== meal.title);
          },
        },
      ]);
    }
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <PageHeader
        title={meal.title}
        variant="back"
        onBackPress={() => navigation.goBack()}
      />

      <View style={styles.contentContainer}>
        <Image source={meal.imageUrl} style={styles.image} />
        <Text style={styles.price}>{meal.price}</Text>
        <Text style={styles.subtitle}>{meal.subTitle}</Text>

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
