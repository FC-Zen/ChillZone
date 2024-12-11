import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Container } from '@mui/material';
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
    <Container maxWidth="xs">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          bgcolor: '#f9fafb',
          padding: 3,
        }}
      >
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
      </Box>
    </Container>
  );
};
