import React, { useEffect, useState } from 'react';
import { PaymentTemplate } from '@components/templates';
import { useTranslation } from 'react-i18next';
import { colors } from '@theme';
import { useNavigation } from '@hooks';
import { ROUTE } from '@enums';
import { useCommand } from '@contexts';
import { createCommand } from '@services/CommandServices';

type PaymentProps = {
  route: {
    params: {
      restaurantId: number;
      pickupTime: string;
    };
  };
};

export const PaymentScreen: React.FC<PaymentProps> = ({ route }) => {
  const { t } = useTranslation();
  const [credit, setCredit] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardExpiration, setCardExpiration] = useState('');
  const [cardCVC, setCardCVC] = useState('');
  const navigation = useNavigation();
  const { listItems, totalAmount } = useCommand();
  const { pickupTime, restaurantId } = route.params;

  const onPay = async () => {
    try {
      const command = {
        payment_method: 'Card',
        pickup_time: pickupTime,
        lines: listItems.map((item) => ({
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
      navigation.navigate(ROUTE.FINAL_PAYMENT, {
        qrcode: response?.qrcode,
        commandId: response?.command_id,
      });
    } catch (error) {
      console.error('createCommand error:', error);
    }
  };

  console.log('totalAmount : ', totalAmount);
  return (
    <PaymentTemplate
      headerTitle={t('headers.pay')}
      navigateToCart={() => navigation.goBack()}
      formTitleIcon="Bell"
      formTitleIconColor={colors.white}
      formTitle={t('cart.creditCard')}
      inputsTitle={t('cart.champs')}
      inputCardNumber={credit}
      setInputCardNumber={setCredit}
      inputCardName={cardName}
      setInputCardName={setCardName}
      inputCardExpiration={cardExpiration}
      inputCardExpirationSubtitle={t('cart.formatDay')}
      setInputCardExpiration={setCardExpiration}
      inputCardCVC={cardCVC}
      inputCardCVCSubtitle={t('cart.numbers')}
      setInputCardCVC={setCardCVC}
      payButtonText={t('buttons.actions.pay') + ` ${totalAmount.toFixed(2)}€`}
      payButtonIcon={{
        name: 'Lock',
        color: colors.resolutionBlue,
      }}
      payButtonColor={colors.white}
      payButtonTextColor={colors.resolutionBlue}
      placeholderCardNumber={t('fields.card.number')}
      placeholderCardName={t('fields.card.name')}
      placeholderCardExpiration={t('fields.card.date')}
      placeholderCardCVC={t('fields.card.code')}
      onPay={() => onPay()}
      paymentInfosText={t('cart.infoPay')}
    />
  );
};
