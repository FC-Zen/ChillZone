import React from 'react';
import { VectorHeader, VectorBottom } from '@components';
import { ResetPassword } from '@components/organisms/ResetPassword';

type ResetPasswordTemplateProps = {
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

    <ResetPassword
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

    <VectorBottom />
  </div>
  );
};
