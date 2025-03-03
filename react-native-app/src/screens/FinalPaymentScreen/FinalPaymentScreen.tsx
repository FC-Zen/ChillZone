import { FinalPaymentTemplate } from '@components';
import { ROUTE } from '@enums';
import { useNavigation, useNotifications } from '@hooks';
import { useTranslation } from 'react-i18next';
import { Alert, Platform, View } from 'react-native';
import { styles } from './style';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { getPaymentId } from '@services/PaymentServices';
import { useEffect, useState } from 'react';
import { useCommand } from '@contexts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '@env';

export type FinalPaymentScreenProps = {
  route: {
    params: {
      qrcode: string;
    };
  };
};

export const FinalPaymentScreen: React.FC<FinalPaymentScreenProps> = ({
  route,
}) => {
  const [qrcodeLink, setQrcodeLink] = useState<string | null>(
    route.params.qrcode
  );
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { scheduleNotification } = useNotifications();
  const { commandId } = useCommand();
  const [id, setId] = useState(commandId || 0);

  useEffect(() => {
    /*     const fetchQrCodeLink = async () => {
      const link = await AsyncStorage.getItem('qrcode_link');
      if (link) {
        setQrcodeLink(link);
      }
    };
    fetchQrCodeLink(); */

    const fetchPaymentId = async () => {
      const response = await getPaymentId();
      if (response) {
        setId(response);
      }
    };
    fetchPaymentId();
  }, []);

  const imageUri = `${API_URL}media/qrcode/` + qrcodeLink;

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
    if (!imageUri) {
      Alert.alert('Erreur', 'Le QR code n’est pas encore disponible.');
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
