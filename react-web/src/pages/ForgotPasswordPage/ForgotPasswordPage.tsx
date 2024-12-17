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
    navigation.navigate(ROUTE.FORGOT_MDP);
  };

  return (
  <div className="d-flex justify-content-center align-items-center min-vh-100">
      <CssBaseline />
      <ForgotPasswordTemplate
        onSendClick={handleSendClick}
        headerText={t('headers.pwdReset')}
        placeholderText={t('fields.common.mail')}
        buttonTitle={t('buttons.actions.confirm')}
        inputEmail={inputEmail}
        setInputEmail={setInputEmail}
      />
    </div>
  );
};
