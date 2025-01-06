import { Text, View, Image } from 'react-native';
import { styles } from './style';
import { PageHeader } from '@components/molecules';
import { colors } from '@theme';
import { Button } from '@components/molecules';

type FinalPaymentTemplateProps = {
    headerTitle: string;
    navigateToHome: () => void;
    qrImagelink: any;
    commandConfirmation: string;
    downloadButtonTitle: string;
    onDownloadPress: () => void;
    bottomCommandInfo: string;
};

export const FinalPaymentTemplate: React.FC<FinalPaymentTemplateProps> = ({
    headerTitle,
    navigateToHome,
    qrImagelink,
    commandConfirmation,
    downloadButtonTitle,
    onDownloadPress,
    bottomCommandInfo,
}) => {
    return (
        <View style={styles.container}>

            <PageHeader 
                title={headerTitle} 
                onBackPress={navigateToHome} 
                variant='back' 
                icon={{ 
                    name: "BackArrow", 
                    color: colors.black 
                }}
                noMargin={true}
            />

            <Text style={styles.commandMessage}>{commandConfirmation}</Text>

            <Image source={qrImagelink} style={styles.qrcodeImage} />

            <Button 
                title={downloadButtonTitle} 
                onPress={onDownloadPress} 
                variant='icon' 
                color={colors.aquaDeep}
                textColor={colors.white}
                icon={{ 
                    name: 'Download', 
                    color: colors.white
                }}
                style={styles.downloadButton}
            />

            <Text style={styles.commandInfo}>{bottomCommandInfo}</Text>

        </View>
    );
}