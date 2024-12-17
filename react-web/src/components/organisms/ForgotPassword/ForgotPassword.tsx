import React from 'react';
import { Button, Checkbox, Header, Link, Logo } from '@components/atoms';
import { Input } from '@components/molecules';
import { Container, Typography } from '@mui/material';

type ForgotPasswordProps = {
  logo: string; // Utilisation d'une chaîne pour l'URL de l'image
  headerText: string;
  placeholderText: string;
  buttonTitle: string;
  onSendClick: () => void;
  inputEmail: string;
  setInputEmail: (email: string) => void;
};

export const ForgotPassword: React.FC<ForgotPasswordProps> = ({
  headerText,
  placeholderText,
  buttonTitle,
  onSendClick,
  inputEmail,
  setInputEmail,
}) => {
  return (
    <Container
      style={{
        width: '22%',
        flexShrink: 0,
        margin: '0 auto',
        marginTop: 50,
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap : "15px"
      }}
    >
      <Logo />
      <Header title={headerText} />
      <Input name={inputEmail} label={placeholderText} required={true} onInputChange={setInputEmail} />
      <Button title={buttonTitle} onclick={onSendClick} variant="primary" />
    </Container>
  );
};

export default ForgotPassword;
