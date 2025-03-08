import { ResetPasswordTemplate } from '@components';
import React, { useState } from 'react';
import { View } from 'react-native';
import { styles } from './style';
import { useNavigation } from '@hooks';
import { useTranslation } from 'react-i18next';
import { ROUTE } from '@enums';
import { logoIUT } from '@assets/Images';

export const ResetPasswordScreen: React.FC = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();

  const [inputPassword, setInputPassword] = useState('');
  const [inputPassword2, setInputPassword2] = useState('');

  const handleModifyPress = () => {
    // Logique à exécuter lors de la réinitialisation du mot de passe
    navigation.navigate(ROUTE.LOGIN_SCREEN);
  };

  return (
    <View style={styles.container}>
      <ResetPasswordTemplate
        logo={logoIUT}
        title={t('headers.pwdReset')}
        placeholderPassword={t('fields.auth.newPassword')}
        placeholderVerifyPassword={t('fields.auth.verifyNewPassword')}
        buttonTitle={t('buttons.actions.modify')}
        onModifyPress={handleModifyPress}
        inputPassword={inputPassword}
        setInputPassword={setInputPassword}
        inputPassword2={inputPassword2}
        setInputPassword2={setInputPassword2}
      />
    </View>
  );
};
