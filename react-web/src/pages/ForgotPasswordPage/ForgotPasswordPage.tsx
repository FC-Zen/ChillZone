import React, { useState } from 'react';
import { Box, CssBaseline } from '@mui/material';
import { ForgotPasswordTemplate } from '@components';
import { useNavigation } from '@hooks';
import { ROUTE } from '@enums';
import { useTranslation } from 'react-i18next';

export const ForgotPasswordPage: React.FC = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const [inputEmail, setInputEmail] = useState('');

  const handleSendClick = () => {
    // Logique à exécuter lors de l'envoi
    navigation.navigate(ROUTE.FORGOT_MDP);
  };

  return (
    <Box
      sx={{
        backgroundColor: '#f9fafb',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <CssBaseline />
      <ForgotPasswordTemplate
        onSendClick={handleSendClick}
        headerText={t('headers.pwdReset')}
        placeholderText={t('fields.common.mail')}
        buttonTitle={t('buttons.actions.send')}
        inputEmail={inputEmail}
        setInputEmail={setInputEmail}
      />
    </Box>
  );
};
