import React from 'react';
import { Input } from '@molecules/Input';
import { Button, Checkbox } from '@components/atoms';
import { Container, Row, Col } from 'react-bootstrap';

export type ConnectionProps = {
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

export const Connection: React.FC<ConnectionProps> = ({
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
    <Container
      className=""
      style={{
        width: '500px',
        height: '500px',
        flexShrink: 0,
        margin: '0 auto',
        marginTop: 50,
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* Logo Section */}
      <Row
        className="d-flex align-items-center justify-content-center mb-4"
        style={{ width: 100, height: 100 }}
      >
        <img src={logo} alt="Logo" style={{ width: 100, height: 100 }} />
      </Row>

      {/* Input fields */}
      <Row className="mb-3 d-flex justify-content-center align-items-center w-100">
        <Input
          icon="User"
          onChangeText={setInputEmail}
          placeholder={placeholderEmail}
          value={inputEmail}
          variant="default"
        />
      </Row>

      <Row className="mb-3 d-flex justify-content-center align-items-center">
        <Input
          icon="Lock"
          onChangeText={setInputPassword}
          placeholder={placeholderPassword}
          value={inputPassword}
          variant="password"
        />
      </Row>

      {/* Remember Me Checkbox */}
      <Row
        className="mb-3"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 5,
        }}
      >
        <Checkbox checked={isChecked} onChange={() => setChecked(!isChecked)} />
        <label>{rememberMeLabel}</label>
      </Row>

      {/* Forgot Password Link */}
      <Row className="mb-4">
        <Col className="d-flex justify-content-end">
          <a
            href="#"
            onClick={navigateToForgotPassword}
            style={{ textDecoration: 'underline', color: 'blue' }}
          >
            {forgotPasswordText}
          </a>
        </Col>
      </Row>

      {/* Login Button */}
      <Row>
        <Col className="d-flex justify-content-center align-items-center ">
          <Button title={buttonText} onclick={onLogin} variant="primary" />
        </Col>
      </Row>
    </Container>
  );
};

export default Connection;
