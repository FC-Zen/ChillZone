import React from 'react';
import { View } from 'react-native';
import { VectorHeader, VectorBottom } from '@components';
import { Connection } from '@components/organisms/Connection';
import styles from './style';

export type ConnectionTemplateProps = {
  inputEmail: string;
  setInputEmail: (email: string) => void;
  inputPassword: string;
  setInputPassword: (password: string) => void;
  isChecked: boolean;
  setChecked: (checked: boolean) => void;
  onLogin: () => void;
  logo: any;
  placeholderEmail: string;
  placeholderPassword: string;
  rememberMeLabel: string;
  forgotPasswordText: string;
  buttonText: string;
  navigateToForgotPassword: () => void;
};

export const ConnectionTemplate: React.FC<ConnectionTemplateProps> = ({
  inputEmail,
  setInputEmail,
  inputPassword,
  setInputPassword,
  isChecked,
  setChecked,
  onLogin,
  logo,
  placeholderEmail,
  placeholderPassword,
  rememberMeLabel,
  forgotPasswordText,
  buttonText,
  navigateToForgotPassword,
}) => {
  return (
    <View style={styles.container}>
      <VectorHeader />
      <View style={styles.contentContainer}>
        <Connection
          inputEmail={inputEmail}
          setInputEmail={setInputEmail}
          inputPassword={inputPassword}
          setInputPassword={setInputPassword}
          isChecked={isChecked}
          setChecked={setChecked}
          onLogin={onLogin}
          logo={logo}
          placeholderEmail={placeholderEmail}
          placeholderPassword={placeholderPassword}
          rememberMeLabel={rememberMeLabel}
          forgotPasswordText={forgotPasswordText}
          buttonText={buttonText}
          navigateToForgotPassword={navigateToForgotPassword}
        />
      </View>
      <VectorBottom />
    </View>
  );
};
