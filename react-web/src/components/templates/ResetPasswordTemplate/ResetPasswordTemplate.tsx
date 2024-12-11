import React from 'react';
import { Box, Container, CssBaseline } from '@mui/material';
import { VectorHeader, VectorBottom } from '@components';
import { ResetPassword } from '@components/organisms/ResetPassword';
import { colors } from '@theme';

type ResetPasswordTemplateProps = {
  logo: string;
  title: string;
  placeholderPassword: string;
  placeholderVerifyPassword: string;
  buttonTitle: string;
  onModifyPress: () => void;
  inputPassword: string;
  setInputPassword: (value: string) => void;
  inputPassword2: string;
  setInputPassword2: (value: string) => void;
};

export const ResetPasswordTemplate: React.FC<ResetPasswordTemplateProps> = ({
  logo,
  title,
  placeholderPassword,
  placeholderVerifyPassword,
  buttonTitle,
  onModifyPress,
  inputPassword,
  setInputPassword,
  inputPassword2,
  setInputPassword2,
}) => {
  return (
    <Box
      sx={{
        backgroundColor: colors.white,
        minHeight: '100vh',
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
        <ResetPassword
          logo={logo}
          title={title}
          placeholderPassword={placeholderPassword}
          placeholderVerifyPassword={placeholderVerifyPassword}
          buttonTitle={buttonTitle}
          onModifyPress={onModifyPress}
          inputPassword={inputPassword}
          setInputPassword={setInputPassword}
          inputPassword2={inputPassword2}
          setInputPassword2={setInputPassword2}
        />
      </Container>
      <VectorBottom />
    </Box>
  );
};
