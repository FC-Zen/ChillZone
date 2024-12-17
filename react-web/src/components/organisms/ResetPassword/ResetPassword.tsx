import React from 'react';
import { Container } from '@mui/system';
import { Button, Header, Logo } from '@components/atoms';
import { Input } from '@components/molecules';

type ResetPasswordProps = {
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

export const ResetPassword: React.FC<ResetPasswordProps> = ({
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
  <Container
        className=""
        style={{
          width: '18%',
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
        <Logo/>
        <Header title={title} />
        <Input name={inputPassword} label={placeholderPassword} onInputChange={setInputPassword}/>
        <Input name={inputPassword2} label={placeholderVerifyPassword} onInputChange={setInputPassword2}/>
        <Button variant="primary" onclick={onModifyPress} title={buttonTitle}/>
      </Container>
  );
};

export default ResetPassword;
