import React, { useState } from 'react';
import { PaymentTemplate } from '@components/templates';
import { useTranslation } from 'react-i18next';
import { colors } from '@theme';
import { useNavigation } from '@hooks';
import { ROUTE } from '@enums';
import { useCommand } from '@contexts';

type PaymentProps = {
  route: {
    params: {
      qrcode: string;
    };
  };
};

export const PaymentScreen: React.FC<PaymentProps> = ({ route }) => {
  const { t } = useTranslation();
  const { totalAmount } = useCommand();
  const [credit, setCredit] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardExpiration, setCardExpiration] = useState('');
  const [cardCVC, setCardCVC] = useState('');
  const navigation = useNavigation();

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
      onPay={() =>
        navigation.navigate(ROUTE.FINAL_PAYMENT, {
          qrcode: route.params.qrcode,
        })
      }
      paymentInfosText={t('cart.infoPay')}
    />
  );
};
