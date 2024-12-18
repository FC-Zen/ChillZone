import React, { useState } from 'react';
import { CssBaseline } from '@mui/material';
import { ForgotPasswordTemplate, SnackBar } from '@components';
import { useNavigation } from '@hooks';
import { ROUTE } from '@enums';
import { useTranslation } from 'react-i18next';
import { sendPasswordRecoveryEmail } from '@services/AuthentificationServices';

export const ForgotPasswordPage: React.FC = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const [inputEmail, setInputEmail] = useState('');

  const handleInputEmail = (value: string) => {
    setInputEmail(value);
    console.log(value);
  };

  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    severity: 'success' | 'error';
    message: string;
  }>({
    open: false,
    severity: 'success',
    message: '',
  });

  const handleSendClick = async () => {
    try {
      let formData = { email : inputEmail};
      await sendPasswordRecoveryEmail(formData);
      navigation.navigate(ROUTE.FORGOT_MDP);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Une erreur est survenue.';
      setSnackbar({
        open: true,
        severity: 'error',
        message: errorMessage,
      });
    }
  };

  const closeSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
  <div className="d-flex justify-content-center align-items-center min-vh-100">
      <CssBaseline />
        <SnackBar
          visible={snackbar.open}
          message={snackbar.message} 
          severity={snackbar.severity}
          onDismiss={closeSnackbar}      
        />
      
        <ForgotPasswordTemplate
          onSendClick={handleSendClick}
          headerText={t('headers.pwdReset')}
          placeholderText={t('fields.common.mail')}
          buttonTitle={t('buttons.actions.confirm')}
          inputEmail={inputEmail}
          setInputEmail={handleInputEmail}
        />
    </div>
  );
};
