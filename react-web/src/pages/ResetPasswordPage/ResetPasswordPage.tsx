import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Container, CssBaseline } from '@mui/material';
import { ResetPasswordTemplate } from '@components';
import { ROUTE } from '@enums';
import { logoIUT } from '@assets/Images';
import { useNavigation } from '@hooks';

export const ResetPasswordPage: React.FC = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const [inputPassword, setInputPassword] = useState('');
  const [inputPassword2, setInputPassword2] = useState('');

  const handleModifyPress = () => {
    // Logique à exécuter lors de la réinitialisation du mot de passe
    console.log('Nouveau mot de passe:', inputPassword);
    navigation.navigate(ROUTE.LOGIN);
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <CssBaseline />
        <ResetPasswordTemplate
          title={t('headers.pwdChange')}
          placeholderPassword={t('fields.auth.newPassword')}
          placeholderVerifyPassword={t('fields.auth.verifyNewPassword')}
          buttonTitle={t('buttons.actions.reset')}
          onModifyPress={handleModifyPress}
          inputPassword={inputPassword}
          setInputPassword={setInputPassword}
          inputPassword2={inputPassword2}
          setInputPassword2={setInputPassword2}
        />
    </div>
  );
};
