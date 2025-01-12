import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CssBaseline } from '@mui/material';
import { ResetPasswordTemplate, SnackBar } from '@components';
import { ROUTE } from '@enums';
import { useNavigation } from '@hooks';
import { changePassword } from '@services/AuthentificationServices';
import { useLocation } from 'react-router-dom';

export const ResetPasswordPage: React.FC = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const url = new URLSearchParams(useLocation().search);
  const token = url.get('token');

  const [formData, setFormData] = useState({
    uuid : token || "",
    inputPassword : "",
    inputVerifyPassword : ""
  });

  const handleInputChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
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

  const closeSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };
  
  const handleModifyPress = async () => {
    try {
      let res = await changePassword(formData,t);
      if (res?.success) {
        setSnackbar({
          open: true,
          severity: 'success',
          message: res.message,
        });
      } else {
        setSnackbar({
          open: true,
          severity: 'error',
          message: 'Une erreur est survenue.',
        });
      }
      navigation.navigate(ROUTE.LOGIN);
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

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <CssBaseline />
        <SnackBar
          visible={snackbar.open}
          message={snackbar.message} 
          severity={snackbar.severity}
          onDismiss={closeSnackbar}      
        />
            
        <ResetPasswordTemplate
          title={t('headers.pwdChange')}
          placeholderPassword={t('fields.auth.newPassword')}
          placeholderVerifyPassword={t('fields.auth.verifyNewPassword')}
          buttonTitle={t('buttons.actions.reset')}
          onModifyPress={handleModifyPress}
          inputPassword={'inputPassword'}
          handleInputChange={handleInputChange}
          inputPassword2={'inputVerifyPassword'}
        />
    </div>
  );
};
