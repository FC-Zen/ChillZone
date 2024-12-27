import { IconProps } from '@components/atoms';
import { PageHeader } from '@components/molecules';
import { CreditInput } from '@components/organisms';
import { View, Text } from 'react-native';
import { styles } from './style';
import { colors } from '@theme';

export type PaymentTemplateProps = {
    headerTitle: string;
    navigateToCart: () => void;
    formTitleIcon: IconProps['name'];
    formTitleIconColor: string;
    formTitle: string;
    inputsTitle: string;
    inputCardNumber: string;
    setInputCardNumber: (cardNumber: string) => void;
    inputCardName: string;
    setInputCardName: (cardName: string) => void;
    inputCardExpiration: string;
    inputCardExpirationSubtitle: string;
    setInputCardExpiration: (cardExpiration: string) => void;
    inputCardCVC: string;
    inputCardCVCSubtitle: string;
    setInputCardCVC: (cardCVC: string) => void;
    payButtonText: string;
    payButtonIcon: IconProps;
    payButtonColor: string;
    payButtonTextColor: string;
    placeholderCardNumber: string;
    placeholderCardName: string;
    placeholderCardExpiration: string;
    placeholderCardCVC: string;
    onPay: () => void;
    paymentInfosText: string;
};

export const PaymentTemplate: React.FC<PaymentTemplateProps> = ({
    headerTitle,
    navigateToCart,
    formTitleIcon,
    formTitleIconColor,
    formTitle,
    inputsTitle,
    inputCardNumber,
    setInputCardNumber,
    inputCardName,
    setInputCardName,
    inputCardExpiration,
    inputCardExpirationSubtitle,
    setInputCardExpiration,
    inputCardCVC,
    inputCardCVCSubtitle,
    setInputCardCVC,
    payButtonText,
    payButtonIcon,
    payButtonColor,
    payButtonTextColor,
    placeholderCardNumber,
    placeholderCardName,
    placeholderCardExpiration,
    placeholderCardCVC,
    onPay,
    paymentInfosText,
}) => {
    return (
        <View style={styles.container}>
            <PageHeader title={headerTitle} onBackPress={navigateToCart} variant='back' icon={{name:"BackArrow", color: colors.black}}/>
            <CreditInput 
                formTitleIcon={formTitleIcon}
                formTitleIconColor={formTitleIconColor}
                formTitle={formTitle}
                inputsTitle={inputsTitle}
                inputCardNumber={inputCardNumber}
                setInputCardNumber={setInputCardNumber}
                inputCardName={inputCardName}
                setInputCardName={setInputCardName}
                inputCardExpiration={inputCardExpiration}
                inputCardExpirationSubtitle={inputCardExpirationSubtitle}
                setInputCardExpiration={setInputCardExpiration}
                inputCardCVC={inputCardCVC}
                inputCardCVCSubtitle={inputCardCVCSubtitle}
                setInputCardCVC={setInputCardCVC}
                payButtonText={payButtonText}
                payButtonIcon={payButtonIcon}
                payButtonColor={payButtonColor}
                payButtonTextColor={payButtonTextColor}
                placeholderCardNumber={placeholderCardNumber}
                placeholderCardName={placeholderCardName}
                placeholderCardExpiration={placeholderCardExpiration}
                placeholderCardCVC={placeholderCardCVC}
                onPay={onPay}
            />
            <Text style={styles.infoText}>{paymentInfosText}</Text>
        </View>
    );
};