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
  handleInputChange: (name: string, value: string) => void;
  inputPassword2: string;
};

export const ResetPasswordTemplate: React.FC<ResetPasswordTemplateProps> = ({
  title,
  placeholderPassword,
  placeholderVerifyPassword,
  buttonTitle,
  onModifyPress,
  inputPassword,
  handleInputChange,
  inputPassword2,
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
          handleInputChange={handleInputChange}
          inputPassword2={inputPassword2}
    />

    <VectorBottom />
  </div>
  );
};
