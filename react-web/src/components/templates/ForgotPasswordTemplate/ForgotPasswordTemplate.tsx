import React from 'react';
import { Box, Container, CssBaseline } from '@mui/material';
import { VectorHeader, VectorBottom } from '@components';
import { ForgotPassword } from '@components/organisms';
import { colors } from '@theme';
import { logoIUT } from '@assets/Images';

type ForgotPasswordTemplateProps = {
  onSendClick: () => void;
  headerText: string;
  placeholderText: string;
  buttonTitle: string;
  inputEmail: string;
  setInputEmail: (email: string) => void;
};

export const ForgotPasswordTemplate: React.FC<ForgotPasswordTemplateProps> = ({
  onSendClick,
  headerText,
  placeholderText,
  buttonTitle,
  inputEmail,
  setInputEmail,
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
        <ForgotPassword
          logo={logoIUT}
          headerText={headerText}
          placeholderText={placeholderText}
          buttonTitle={buttonTitle}
          onSendClick={onSendClick}
          inputEmail={inputEmail}
          setInputEmail={setInputEmail}
        />
      </Container>
      <VectorBottom />
    </Box>
  );
};
