import { IconProps } from "@components/atoms";
import { Input, Button, IconWithText } from "@components/molecules";
import { View, Text } from "react-native";
import { styles } from "./style";
import { colors } from "@theme";

export type CreditInputProps = {
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
}

export const CreditInput: React.FC<CreditInputProps> = ({
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
}) => {
    return (
        <View style={styles.container}>
            <View style={styles.formContainer}>
                <IconWithText 
                    icon={formTitleIcon}
                    iconColor={colors.white}
                    text={formTitle}
                    textColor={colors.white}
                    variant='horizontal'
                    style={styles.formTitle}
                />
                <View style={styles.inputsContainer}>
                    <Text style={styles.inputTitle}>{inputsTitle}</Text>
                    <Input 
                        value={inputCardNumber}
                        onChangeText={setInputCardNumber}
                        placeholder={placeholderCardNumber}
                        style={styles.input}
                        textSize={12}
                    />

                    <Input 
                        value={inputCardName}
                        onChangeText={setInputCardName}
                        placeholder={placeholderCardName}
                        style={styles.input}
                        textSize={12}
                    />

                    <View style={styles.inputsRow}>
                        <View style={styles.smallInputContainer}>
                            <Input 
                                value={inputCardExpiration}
                                onChangeText={setInputCardExpiration}
                                placeholder={placeholderCardExpiration}
                                style={styles.subtitledInput}
                                variant="subtitled"
                                subtitle={inputCardExpirationSubtitle}
                                subtitleColor={colors.white}
                                textSize={12}
                            />
                        </View>

                        <View style={styles.smallInputContainer}>
                            <Input 
                                value={inputCardCVC}
                                onChangeText={setInputCardCVC}
                                placeholder={placeholderCardCVC}
                                style={styles.subtitledInput}
                                variant="subtitled"
                                subtitle={inputCardCVCSubtitle}
                                subtitleColor={colors.white}
                                textSize={12}
                            />
                        </View>
                    </View>
                </View>
                <Button 
                    title={payButtonText} 
                    variant="icon"
                    icon={payButtonIcon}
                    onPress={onPay} 
                    color={payButtonColor}
                    textColor={payButtonTextColor}
                    style={styles.payButton}
                />
            </View>
        </View>
    );
};