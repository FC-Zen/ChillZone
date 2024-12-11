import React from 'react';
import { Box, CssBaseline } from '@mui/material';
import { ForgotMdpTemplate } from '@components';
import { logoIUT } from '@assets/Images';
import { ROUTE } from '@enums';
import { useNavigation } from '@hooks';
import { useTranslation } from 'react-i18next';

export const ForgotMdpPage: React.FC = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();

  const handleButtonClick = () => {
    navigation.navigate(ROUTE.LOGIN_SCREEN);
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
      <ForgotMdpTemplate
        logo={logoIUT}
        title={t('headers.pwdReset')}
        infoText={t('questions.infoPwd')}
        buttonTitle={t('buttons.auth.connect')}
        onButtonClick={handleButtonClick}
      />
    </Box>
  );
};
