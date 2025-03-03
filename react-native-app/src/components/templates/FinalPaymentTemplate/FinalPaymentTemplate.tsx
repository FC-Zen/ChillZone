import { Text, View, Image } from 'react-native';
import { styles } from './style';
import { PageHeader } from '@components/molecules';
import { colors, layout, typography } from '@theme';
import { Button } from '@components/molecules';
import { Trans } from 'react-i18next';

type FinalPaymentTemplateProps = {
  headerTitle: string;
  navigateToHome: () => void;
  qrImagelink: any;
  commandConfirmation: string;
  commandId: number;
  downloadButtonTitle: string;
  onDownloadPress: () => void;
  bottomCommandInfo: string;
};

export const FinalPaymentTemplate: React.FC<FinalPaymentTemplateProps> = ({
  headerTitle,
  navigateToHome,
  qrImagelink,
  commandConfirmation,
  commandId,
  downloadButtonTitle,
  onDownloadPress,
  bottomCommandInfo,
}) => {
  const commandSplit = commandConfirmation.split('{{id}}');

  console.log('QR Code Image URL:', qrImagelink); // ✅ Vérifie que l'URL est bien reçue

  return (
    <View style={styles.container}>
      <PageHeader
        title={headerTitle}
        onBackPress={navigateToHome}
        variant="back"
        icon={{
          name: 'Cross',
          color: colors.black,
        }}
        noMargin={true}
      />

      <Text style={styles.commandMessage}>
        {commandSplit[0]}
        <Text style={{ fontWeight: 'bold', color: colors.resolutionBlue }}>
          {commandId}
        </Text>
        {commandSplit[1]}
      </Text>

      {qrImagelink ? (
        <Image source={{ uri: qrImagelink }} style={styles.qrcodeImage} />
      ) : (
        <Text>Chargement du QR Code...</Text>
      )}

      <Button
        title={downloadButtonTitle}
        onPress={onDownloadPress}
        variant="icon"
        color={colors.aquaDeep}
        textColor={colors.white}
        icon={{
          name: 'Download',
          color: colors.white,
        }}
        style={styles.downloadButton}
        textSize={11}
      />

      <Text style={styles.commandInfo}>{bottomCommandInfo}</Text>
    </View>
  );
};
