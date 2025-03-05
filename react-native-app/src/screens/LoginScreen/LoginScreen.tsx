import React, { useEffect, useState } from 'react';
import { authenticateUser, testAuthentificate } from '@services';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@hooks';
import { ROUTE } from '@enums';
import { UserContext } from '@contexts';
import { View } from 'react-native';
import { ConnectionTemplate, SnackBar } from '@components';
import { styles } from './style';
import { logoIUT } from '@assets/Images';

export const LoginScreen: React.FC = () => {
  useEffect(() => {
    const checkAuth = async () => {
      const result = await testAuthentificate();
      console.dir('Test authentification login screen: ', result);

      if (result.success && result.data) {
        const userContext = UserContext.getInstance();
        userContext.setUser(result.data);
        userContext.setNotificationSetting(result.data.notifications[0]);
        navigation.navigate(ROUTE.HOME);
      }
    };

    checkAuth();
  }, []);

  const navigation = useNavigation();
  const { t } = useTranslation();
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [isChecked, setChecked] = useState(false);

  const [authResult, setAuthResult] = useState<{
    severity: 'success' | 'error';
    message: string;
  } | null>(null);

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
      const result = await authenticateUser(isChecked, {
        login: inputEmail,
        password: inputPassword,
      });
      setAuthResult({ severity: 'success', message: result.message });

      if (result.data) {
        const userContext = UserContext.getInstance();
        userContext.setUser(result.data);
        userContext.setNotificationSetting(result.data.notifications[0]);
        navigation.navigate(ROUTE.HOME);
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Une erreur est survenue.';
      setAuthResult({ severity: 'error', message: errorMessage });
    }
  };

  useEffect(() => {
    if (authResult) {
      setSnackbar({
        open: true,
        severity: authResult.severity,
        message: authResult.message,
      });
    }
  }, [authResult]);

  return (
    <View style={styles.container}>
      <SnackBar
        visible={snackbar.open}
        message={snackbar.message}
        onDismiss={() => setSnackbar({ ...snackbar, open: false })}
        severity={snackbar.severity}
      />

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
    </View>
  );
};
