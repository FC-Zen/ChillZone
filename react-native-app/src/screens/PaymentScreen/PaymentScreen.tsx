import React, { useEffect, useState } from 'react';
import { PaymentTemplate } from '@components/templates';
import { useTranslation } from 'react-i18next';
import { colors } from '@theme';
import { useNavigation } from '@hooks';
import { ROUTE } from '@enums';
import { useCommand } from '@contexts';
import { createCommand } from '@services/CommandServices';
import * as z from 'zod';
import { SnackBar } from '@components';

// Définition du schéma de validation pour les infos de carte bancaire
const cardSchema = z.object({
  credit: z
    .string()
    .regex(/^\d{16}$/, "Numéro de carte invalide (16 chiffres requis)"),
  cardName: z.string().min(2, "Nom de carte invalide"),
  cardExpiration: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Date d'expiration invalide (MM/AA)"),
  cardCVC: z
    .string()
    .regex(/^\d{3,4}$/, "CVV invalide (3 ou 4 chiffres requis)"),
});


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

  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    severity: 'success' | 'error';
    message: string;
  }>({
    open: false,
    severity: 'success',
    message: '',
  });

  const getInputName = (name: string) => {
    switch (name) {
      case 'credit':
        return t('fields.card.number');
      case 'cardName':
        return t('fields.card.name');
      case 'cardExpiration':
        return t('fields.card.date');
      case 'cardCVC':
        return t('fields.card.code');
      default:
        return '';
    }
  };

  const onPay = async () => {
    // On vérifie que les infos de carte bancaire respectent le schéma de validation
    const result = cardSchema.safeParse({
      credit,
      cardName,
      cardExpiration,
      cardCVC,
    });

    if (!result.success) {
      // Récupérer les messages d'erreur pour chaque champ
      const fieldErrors: string[] = [];
      result.error.errors.forEach((err) => {
        if (err.path.length > 0) {
          fieldErrors.push(getInputName(err.path[0].toString()));
        }
      });
      // Afficher les erreurs
      setSnackbar({
        open: true,
        severity: 'error',
        message: t('errors.payment.cartFieldInvalid') + ' ' + fieldErrors.join(', '),
      });

      return;
    }

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

  return (
    <>
      <SnackBar
        visible={snackbar.open}
        message={snackbar.message}
        onDismiss={() => setSnackbar({ ...snackbar, open: false })}
        severity={snackbar.severity}
      />
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
    </>
  );
};

