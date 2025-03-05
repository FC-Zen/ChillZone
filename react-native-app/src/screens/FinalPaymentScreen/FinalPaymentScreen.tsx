import { FinalPaymentTemplate } from '@components';
import { ROUTE } from '@enums';
import { useNavigation, useNotifications } from '@hooks';
import { useTranslation } from 'react-i18next';
import { Alert, Platform, View } from 'react-native';
import { styles } from './style';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { useEffect, useState } from 'react';
import { API_URL } from '@env';
import { testQrCode } from '@services/PaymentServices';
import { ImagesMap } from '@utils';

export type FinalPaymentScreenProps = {
  route: {
    params: {
      qrcode: string;
      commandId: number;
    };
  };
};

export const FinalPaymentScreen: React.FC<FinalPaymentScreenProps> = ({
  route,
}) => {
  const qrcodeLink = route.params.qrcode;
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { scheduleNotification } = useNotifications();
  const id = route.params.commandId;
  const [imageUri, setImageUri] = useState<string>('');

  useEffect(() => {
    console.log('QRcode: ', route.params.qrcode);
    if (qrcodeLink?.includes('qrcode')) {
      setImageUri(`${API_URL}media/` + qrcodeLink);
    } else {
      setImageUri(`${API_URL}media/qrcode/` + qrcodeLink);
    }
  }, []);

  const saveFile = async (uri: string, filename: string, mimetype: string) => {
    if (Platform.OS === 'android') {
      const permissions =
        await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
      if (permissions.granted) {
        const base64 = await FileSystem.readAsStringAsync(uri, {
          encoding: FileSystem.EncodingType.Base64,
        });
        await FileSystem.StorageAccessFramework.createFileAsync(
          permissions.directoryUri,
          filename,
          mimetype
        )
          .then(async (uri) => {
            await FileSystem.writeAsStringAsync(uri, base64, {
              encoding: FileSystem.EncodingType.Base64,
            });
          })
          .catch((e) => console.log(e));
      } else {
        shareAsync(uri);
      }
    } else {
      shareAsync(uri);
    }
  };

  const navigateToHome = async () => {
    navigation.navigate(ROUTE.HOME);

    try {
      await scheduleNotification(
        t('notification.paymentSuccessTitle'),
        t('notification.paymentSuccessBody', { commandId: id }),
        { commandId: id }
      );
    } catch (error) {
      console.error('Erreur lors de la notification', error);
    }
  };

  const shareAsync = async (uri: any) => {
    try {
      await Sharing.shareAsync(uri);
    } catch (error) {
      console.error('Error sharing the file:', error);
      Alert.alert('Erreur', 'Échec du partage du fichier.');
    }
  };

  const onDownloadPress = async () => {
    console.log('URI', imageUri);
    if (!imageUri) {
      Alert.alert('Erreur', 'Le QR code n’est pas encore disponible.');
      console.error('url invalide', imageUri);

      return;
    }

    const fileUri = `${FileSystem.documentDirectory}qrcode.png`;
    try {
      await FileSystem.downloadAsync(imageUri, fileUri);
      await saveFile(fileUri, 'qrcode.png', 'image/png');
      Alert.alert('Succès', `Image copiée dans votre dossier`);
    } catch (error) {
      console.error('Erreur de téléchargement', error);
      Alert.alert('Erreur', 'Échec du téléchargement.');
    }
  };

  return (
    <View style={styles.container}>
      <FinalPaymentTemplate
        headerTitle={t('headers.finalCommand')}
        navigateToHome={navigateToHome}
        qrImagelink={imageUri}
        commandConfirmation={t('cart.confirmText')}
        commandId={id}
        downloadButtonTitle={t('buttons.actions.qrCode')}
        onDownloadPress={onDownloadPress}
        bottomCommandInfo={t('cart.readyText')}
      />
    </View>
  );
};
