import { FinalPaymentTemplate } from '@components';
import { ROUTE } from '@enums';
import { useNavigation, useNotifications } from '@hooks';
import { ImagesMap } from '@utils';
import { useTranslation } from 'react-i18next';
import { Alert, Platform, View } from 'react-native';
import { styles } from './style';
// POUR LE DOWNLOAD
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { Asset } from 'expo-asset';
import { getPaymentId } from '@services/PaymentServices';
import { useEffect, useState } from 'react';
import { useCommand } from '@contexts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '@env';

export const FinalPaymentScreen = () => {
  let qrcode_link: string | null = '';
  const getQrCodeLink = async () => {
    qrcode_link = await AsyncStorage.getItem('qrcode_link');
  };

  getQrCodeLink();

  const { t } = useTranslation();
  const navigation = useNavigation();
  const image = `${API_URL}media/qrcode/` + qrcode_link;
  const { scheduleNotification } = useNotifications();

  // Expo Asset pour le télécharger
  const imageAsset = Asset.fromModule(image);
  const imageUri = imageAsset.uri;

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
    console.log('navigateToHome called');
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

  // Click réponse avec Download et Save
  const onDownloadPress = async () => {
    const fileUri = `${FileSystem.documentDirectory}qrcode.png`;
    console.log(imageUri);
    console.log(fileUri);
    try {
      await FileSystem.downloadAsync(imageUri, fileUri);
      await saveFile(fileUri, 'qrcode.png', 'image/png');
      Alert.alert('Succès', `Image copiée dans votre dossier`);
    } catch (error) {
      console.error('Erreur de téléchargement', error);
      Alert.alert('Erreur', 'Échec du téléchargement.');
    }
  };

  const { commandId } = useCommand();
  const [id, setId] = useState(commandId || 0);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getPaymentId();
      console.log(response);
      if (response) {
        setId(response);
      }
    };
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <FinalPaymentTemplate
        headerTitle={t('headers.finalCommand')}
        navigateToHome={navigateToHome}
        qrImagelink={image}
        commandConfirmation={t('cart.confirmText')}
        commandId={id}
        downloadButtonTitle={t('buttons.actions.qrCode')}
        onDownloadPress={onDownloadPress}
        bottomCommandInfo={t('cart.readyText')}
      />
    </View>
  );
};
