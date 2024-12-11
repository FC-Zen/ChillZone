import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { VectorHeader, VectorBottom } from '@components';
import { Connection } from '@components/organisms/Connection';

export type ConnectionTemplateProps = {
  inputEmail: string;
  setInputEmail: (email: string) => void;
  inputPassword: string;
  setInputPassword: (password: string) => void;
  isChecked: boolean;
  setChecked: (checked: boolean) => void;
  onLogin: () => void;
  logo: string;
  placeholderEmail: string;
  placeholderPassword: string;
  rememberMeLabel: string;
  forgotPasswordText: string;
  buttonText: string;
  navigateToForgotPassword: () => void;
};

export const ConnectionTemplate: React.FC<ConnectionTemplateProps> = ({
  inputEmail,
  setInputEmail,
  inputPassword,
  setInputPassword,
  isChecked,
  setChecked,
  onLogin,
  logo,
  placeholderEmail,
  placeholderPassword,
  rememberMeLabel,
  forgotPasswordText,
  buttonText,
  navigateToForgotPassword,
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

      {/* Contenu central */}
      <Container>
        <Row>
          <Col>
            <Connection
              inputEmail={inputEmail}
              setInputEmail={setInputEmail}
              inputPassword={inputPassword}
              setInputPassword={setInputPassword}
              isChecked={isChecked}
              setChecked={setChecked}
              onLogin={onLogin}
              logo={logo}
              placeholderEmail={placeholderEmail}
              placeholderPassword={placeholderPassword}
              rememberMeLabel={rememberMeLabel}
              forgotPasswordText={forgotPasswordText}
              buttonText={buttonText}
              navigateToForgotPassword={navigateToForgotPassword}
            />
          </Col>
        </Row>
      </Container>

      {/* VectorBottom: en bas de la page */}
      <VectorBottom />
    </div>
  );
};
