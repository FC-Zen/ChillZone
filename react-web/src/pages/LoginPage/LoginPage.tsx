import React, { useState } from 'react';
import { Box, Snackbar, Alert, CssBaseline } from '@mui/material';
import { ConnectionTemplate } from '@components';
import { authenticateUser } from '@services';
import { logoIUT } from '@assets/Images';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@hooks';
import { ROUTE } from '@enums';

export const LoginPage: React.FC = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [isChecked, setChecked] = useState(false);

  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    severity: 'success' | 'error';
    message: string;
  }>({
    open: false,
    severity: 'success',
    message: '',
  });

  const handleLogin = async () => {
    try {
      await authenticateUser(inputEmail, inputPassword);
      console.log('Connexion réussie !');
      setSnackbar({
        open: true,
        severity: 'success',
        message: 'Connexion réussie !',
      });
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
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={closeSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={closeSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      <ConnectionTemplate
        inputEmail={inputEmail}
        setInputEmail={setInputEmail}
        inputPassword={inputPassword}
        setInputPassword={setInputPassword}
        isChecked={isChecked}
        setChecked={setChecked}
        onLogin={handleLogin}
        logo={logoIUT}
        placeholderEmail={t('fields.common.mail')}
        placeholderPassword={t('fields.auth.password')}
        rememberMeLabel={t('categories.rememberMe')}
        forgotPasswordText={t('questions.pwd')}
        buttonText={t('buttons.auth.connect')}
        navigateToForgotPassword={() =>
          navigation.navigate(ROUTE.FORGOT_PASSWORD)
        }
      />
    </Box>
  );
};
