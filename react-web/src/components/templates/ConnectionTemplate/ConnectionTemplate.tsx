import React from 'react';
import { Box, Container, CssBaseline } from '@mui/material';
import { VectorHeader, VectorBottom } from '@components';
import { Connection } from '@components/organisms/Connection';
import { colors, layout } from '@theme';

export type ConnectionTemplateProps = {
  inputEmail: string;
  setInputEmail: (email: string) => void;
  inputPassword: string;
  setInputPassword: (password: string) => void;
  isChecked: boolean;
  setChecked: (checked: boolean) => void;
  onLogin: () => void;
  logo: string;
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
    <Box
      sx={{
        backgroundColor: colors.white,
        minHeight: layout.screen.height,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <CssBaseline />
      <VectorHeader />
      <Container
        sx={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 2,
        }}
      >
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
      </Container>
      <VectorBottom />
    </Box>
  );
};
