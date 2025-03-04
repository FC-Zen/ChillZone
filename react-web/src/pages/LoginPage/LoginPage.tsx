import React, { useState } from 'react';
import { CssBaseline } from '@mui/material';
import { ConnectionTemplate, SnackBar } from '@components';
import { authenticateUser } from '@services';
import { useTranslation } from 'react-i18next';
import { useNavigation, useUser } from '@hooks';
import { ROUTE } from '@enums';

export const LoginPage: React.FC = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { user, setUser } = useUser();

  const [formData, setFormData] = useState({
    login : "",
    password : ""
  });

  const handleInputChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

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
      const res = await authenticateUser(formData);
      if (res?.success && res.data != null) {
        setSnackbar({
          open: true,
          severity: 'success',
          message: res.message,
        });
        setUser({
          userEmail: res.data.email,
          username: res.data.first_name + " " + res.data.last_name,
          organization: res.data.establishment,
          role : res.data.type,
          photo_link : `${import.meta.env.VITE_REACT_APP_API_URL.slice(0, -1)}${res.data.photo_link}`,
        });
        switch (res?.data.type) {
          case 'admin':
            setUser(prevUser => ({
              ...prevUser ?? { userEmail: '', username: '', organization: '', role: '', photo_link : '' },
              role: 'Administrateur'
            }));
            navigation.navigate(ROUTE.ADMIN_DASHBOARD);
            break;
          case 'owner':
            setUser(prevUser => ({
              ...prevUser ?? { userEmail: '', username: '', organization: '', role: '', photo_link : '' },
              role: 'Restaurateur'
            }));
            navigation.navigate(ROUTE.OWNER_DASHBOARD);
            break;
          case 'superadmin':
            setUser(prevUser => ({
              ...prevUser ?? { userEmail: '', username: '', organization: '', role: '', photo_link : '' },
              role: 'Super-Administrateur'
            }));
            navigation.navigate(ROUTE.ADMIN_DASHBOARD);
            break;
          default:
            setSnackbar({
              open: true,
              severity: 'error',
              message: 'Erreur de redirection',
            });
        };
      } else {
        setSnackbar({
          open: true,
          severity: 'error',
          message: res?.message || "Erreur",
        });
      };
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

      <ConnectionTemplate
        onInputChange={handleInputChange}
        isChecked={isChecked}
        setChecked={setChecked}
        onLogin={handleLogin}
        headerTitle={t('headers.connexion')}
        placeholderEmail={t('fields.common.mail')}
        placeholderPassword={t('fields.auth.password')}
        rememberMeLabel={t('info.rememberMe')}
        forgotPasswordText={t('info.recoverPwd')}
        signinText={t('info.singin')}
        buttonText={t('buttons.auth.connect')}
        navigateToForgotPassword={() => navigation.navigate(ROUTE.FORGOT_PASSWORD)}
        navigateToSignUp={() => navigation.navigate(ROUTE.SIGNUP_OWNER)}
        />
    </div>
  );
};
