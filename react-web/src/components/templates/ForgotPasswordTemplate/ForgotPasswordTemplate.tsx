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
    
          <ForgotPassword
          logo={logoIUT}
          headerText={headerText}
          placeholderText={placeholderText}
          buttonTitle={buttonTitle}
          onSendClick={onSendClick}
          inputEmail={inputEmail}
          setInputEmail={setInputEmail}
          />
    
          <VectorBottom />
        </div>
  );
};
