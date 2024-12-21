import React from 'react';
import { VectorHeader, VectorBottom } from '@components';
import { Connection } from '@components/organisms/Connection';

export type ConnectionTemplateProps = {
  onInputChange : (name: string, value: string) => void;
  isChecked: boolean;
  setChecked: (checked: boolean) => void;
  onLogin: () => void;
  headerTitle: string;
  placeholderEmail: string;
  placeholderPassword: string;
  rememberMeLabel: string;
  forgotPasswordText: string;
  buttonText: string;
  signinText: string;
  navigateToForgotPassword: () => void;
  navigateToSignUp : () => void;
};

export const ConnectionTemplate: React.FC<ConnectionTemplateProps> = ({
  onInputChange,
  isChecked,
  setChecked,
  onLogin,
  placeholderEmail,
  placeholderPassword,
  rememberMeLabel,
  forgotPasswordText,
  buttonText,
  headerTitle,
  signinText,
  navigateToForgotPassword,
  navigateToSignUp
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <VectorHeader />

        <Connection
          onInputChange={onInputChange}
          isChecked={isChecked}
          setChecked={setChecked}
          onLogin={onLogin}
          headerTitle={headerTitle}
          placeholderEmail={placeholderEmail}
          placeholderPassword={placeholderPassword}
          rememberMeLabel={rememberMeLabel}
          forgotPasswordText={forgotPasswordText}
          buttonText={buttonText}
          signinText={signinText}
          navigateToForgotPassword={navigateToForgotPassword}
          navigateToSignUp={navigateToSignUp}
        />

      <VectorBottom />
    </div>
  );
};
