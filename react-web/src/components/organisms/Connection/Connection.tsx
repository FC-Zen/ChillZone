import React from 'react';
import { Input } from '@molecules/Input';
import { Button, Checkbox, Header, Link, Logo } from '@components/atoms';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

export type ConnectionProps = {
  onInputChange : (name: string, value: string) => void;
  isChecked: boolean;
  setChecked: (checked: boolean) => void;
  onLogin: () => void;
  placeholderEmail: string;
  placeholderPassword: string;
  rememberMeLabel: string;
  forgotPasswordText: string;
  headerTitle : string;
  buttonText: string;
  signinText : string;
  navigateToForgotPassword: () => void;
};

export const Connection: React.FC<ConnectionProps> = ({
  onInputChange,
  isChecked,
  setChecked,
  onLogin,
  placeholderEmail,
  placeholderPassword,
  rememberMeLabel,
  forgotPasswordText,
  buttonText,
  signinText,
  headerTitle,
  navigateToForgotPassword,
}) => {
  return (
    <Container
      className=""
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
      <Header title={headerTitle} />
      <Link url={'#'} onClick={navigateToForgotPassword} text={signinText} color="secondary"/>
      <Input name={'login'} label={placeholderEmail} required={true} onInputChange={onInputChange} />
      <Input name={'password'} label={placeholderPassword} type="password" onInputChange={onInputChange} />
      <Checkbox checked={isChecked} onChange={() => setChecked(!isChecked)} label={rememberMeLabel} />
      <Link url={'#'} onClick={navigateToForgotPassword} text={forgotPasswordText} />
      <Button title={buttonText} onclick={onLogin} variant="primary" />
    </Container>
  );
};

export default Connection;
