import { FinalPaymentTemplate } from "@components";
import { ROUTE } from "@enums";
import { useNavigation } from "@hooks";
import { ImagesMap } from "@utils";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { styles } from "./style";


export const FinalPaymentScreen = () => {
    const { t } = useTranslation();
    const navigation = useNavigation();
    const image = ImagesMap['qrcode.png'];

    return (
        <View style={styles.container}>
            <FinalPaymentTemplate 
                headerTitle={t('headers.finalCommand')}
                navigateToHome={() => navigation.navigate(ROUTE.HOME)} 
                qrImagelink={image} 
                commandConfirmation={t('cart.confirmText')}
                downloadButtonTitle={t('buttons.actions.qrCode')}
                onDownloadPress={() => {}} 
                bottomCommandInfo={t('cart.readyText')}
            />
        </View>
    );
}