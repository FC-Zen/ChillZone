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
  handleInputChange: (name: string, value: string) => void;
  inputPassword2: string;
};

export const ResetPassword: React.FC<ResetPasswordProps> = ({
  title,
  placeholderPassword,
  placeholderVerifyPassword,
  buttonTitle,
  onModifyPress,
  handleInputChange
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

        <Logo/>
        <Header title={title} />
        <Input icon='Lock' name={'inputPassword'} label={placeholderPassword} onInputChange={handleInputChange}/>
        <Input icon='Lock' name={'inputVerifyPassword'} label={placeholderVerifyPassword} onInputChange={handleInputChange}/>
        <Button variant="primary" onclick={onModifyPress} title={buttonTitle}/>
      </Container>
  );
};

export default ResetPassword;
