import React from 'react';
import { View } from 'react-native';
import { ForgotMdpTemplate } from '@components';
import { logoIUT } from '@assets/Images';
import { ROUTE } from '@enums';
import { useNavigation } from '@hooks';
import { useTranslation } from 'react-i18next';
import { styles } from './style';

export const ForgotMdpScreen: React.FC = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();

  const handleButtonPress = () => {
    navigation.navigate(ROUTE.LOGIN_SCREEN);
  };

  return (
    <View style={styles.container}>
      <ForgotMdpTemplate
        logo={logoIUT}
        title={t('headers.pwdReset')}
        infoText={t('questions.infoPwd')}
        buttonTitle={t('buttons.auth.connect')}
        onButtonPress={handleButtonPress}
      />
    </View>
  );
};
