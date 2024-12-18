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
      sx={{
        width: '22%',
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: '0 16px',
        mt: 3,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 4,
        '@media (max-width: 600px)': {
          width: '80%!important',
        },
        '@media (max-width: 1404px)': {
          width: '50%',
        },
      }}
    >

      <Logo />
      <Header title={headerText} />
      <Input icon="Inbox" name={inputEmail} label={placeholderText} required={true} onInputChange={(_, value) => setInputEmail(value)} />
      <Button title={buttonTitle} onclick={onSendClick} variant="primary" />
    </Container>
  );
};

export default ForgotPassword;
