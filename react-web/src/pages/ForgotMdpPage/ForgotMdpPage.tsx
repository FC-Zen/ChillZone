import React from 'react';
import { CssBaseline } from '@mui/material';
import { ForgotMdpTemplate } from '@components';
import { ROUTE } from '@enums';
import { useNavigation } from '@hooks';
import { useTranslation } from 'react-i18next';

export const ForgotMdpPage: React.FC = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();

  const handleButtonClick = () => {
    navigation.navigate(ROUTE.RESET_PASSWORD);
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <CssBaseline />
      <ForgotMdpTemplate
        title={t('headers.pwdReset')}
        infoText={t('info.infoPwd')}
        buttonTitle={t('buttons.auth.connect')}
        onButtonClick={handleButtonClick}
      />
    </div>
  );
};
