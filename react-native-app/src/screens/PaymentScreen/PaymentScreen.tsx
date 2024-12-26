import React, { useState } from "react";
import { PaymentTemplate } from "@components/templates";
import { useTranslation } from "react-i18next";
import { colors } from "@theme";


export const PaymentScreen = () => {
    const { t } = useTranslation();
    const [totalAmount, setTotalAmount] = useState(0);
    const [credit, setCredit] = useState("");
    const [cardName, setCardName] = useState("");
    const [cardExpiration, setCardExpiration] = useState("");
    const [cardCVC, setCardCVC] = useState("");


    return (
        <PaymentTemplate
            headerTitle={t("headers.pay")}
            navigateToCart={() => {}}
            formTitleIcon="Bell"
            formTitleIconColor={colors.white}
            formTitle={t("cart.creditCard")}
            inputsTitle={t("cart.champs")}
            inputCardNumber={credit}
            setInputCardNumber={setCredit}
            inputCardName={cardName}
            setInputCardName={setCardName}
            inputCardExpiration={cardExpiration}
            inputCardExpirationSubtitle={t("cart.formatDay")}
            setInputCardExpiration={setCardExpiration}
            inputCardCVC={cardCVC}
            inputCardCVCSubtitle={t("cart.numbers")}
            setInputCardCVC={setCardCVC}
            payButtonText={t("buttons.actions.pay") + ` ${totalAmount}€`}
            payButtonIcon={{ 
                name: "Lock",
                color: colors.resolutionBlue,
            }}
            payButtonColor={colors.white}
            payButtonTextColor={colors.resolutionBlue}
            placeholderCardNumber={t("fields.card.number")}
            placeholderCardName={t("fields.card.name")}
            placeholderCardExpiration={t("fields.card.date")}
            placeholderCardCVC={t("fields.card.code")}
            onPay={() => {}}
            paymentInfosText={t("cart.infoPay")}
        />
    );
}