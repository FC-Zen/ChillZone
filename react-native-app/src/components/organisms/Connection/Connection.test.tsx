import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Connection } from '.'; // Adapte le chemin selon ton projet

describe('Connection Component', () => {
  const mockSetInputEmail = jest.fn();
  const mockSetInputPassword = jest.fn();
  const mockSetChecked = jest.fn();
  const mockOnLogin = jest.fn();
  const mockNavigateToForgotPassword = jest.fn();

  const defaultProps = {
    inputEmail: '',
    setInputEmail: mockSetInputEmail,
    inputPassword: '',
    setInputPassword: mockSetInputPassword,
    isChecked: false,
    setChecked: mockSetChecked,
    onLogin: mockOnLogin,
    logo: require('../assets/logo.png'), // Mets un logo valide ici
    placeholderEmail: 'Email',
    placeholderPassword: 'Mot de passe',
    rememberMeLabel: 'Se souvenir de moi',
    forgotPasswordText: 'Mot de passe oublié ?',
    buttonText: 'Se connecter',
    navigateToForgotPassword: mockNavigateToForgotPassword,
  };

  it('Puts email', () => {
    const { getByTestId } = render(<Connection {...defaultProps} />);
    const emailInput = getByTestId('email-input');

    fireEvent.changeText(emailInput, 'test@example.com');
    expect(mockSetInputEmail).toHaveBeenCalledWith('test@example.com');
  });

  it('Puts password', () => {
    const { getByTestId } = render(<Connection {...defaultProps} />);
    const passwordInput = getByTestId('password-input');

    fireEvent.changeText(passwordInput, 'password123');
    expect(mockSetInputPassword).toHaveBeenCalledWith('password123');
  });
});
