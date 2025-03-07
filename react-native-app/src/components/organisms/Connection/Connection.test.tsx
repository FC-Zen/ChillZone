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

  it('rend correctement tous les éléments', () => {
    const { getByTestId, getByText } = render(<Connection {...defaultProps} />);

    expect(getByTestId('connection-container')).toBeTruthy();
    expect(getByTestId('logo-image')).toBeTruthy();
    expect(getByTestId('email-input')).toBeTruthy();
    expect(getByTestId('password-input')).toBeTruthy();
    expect(getByTestId('checkbox')).toBeTruthy();
    expect(getByText('Mot de passe oublié ?')).toBeTruthy();
    expect(getByTestId('login-button')).toBeTruthy();
  });

  it('met à jour le champ email correctement', () => {
    const { getByTestId } = render(<Connection {...defaultProps} />);
    const emailInput = getByTestId('email-input');

    fireEvent.changeText(emailInput, 'test@example.com');
    expect(mockSetInputEmail).toHaveBeenCalledWith('test@example.com');
  });

  it('met à jour le champ mot de passe correctement', () => {
    const { getByTestId } = render(<Connection {...defaultProps} />);
    const passwordInput = getByTestId('password-input');

    fireEvent.changeText(passwordInput, 'password123');
    expect(mockSetInputPassword).toHaveBeenCalledWith('password123');
  });

  it('coche et décoche la case "Se souvenir de moi"', () => {
    const { getByTestId } = render(<Connection {...defaultProps} />);
    const checkbox = getByTestId('checkbox');

    fireEvent.press(checkbox);
    expect(mockSetChecked).toHaveBeenCalledWith(true);
  });

  it('appelle la fonction de connexion lorsqu’on clique sur le bouton', () => {
    const { getByTestId } = render(<Connection {...defaultProps} />);
    const loginButton = getByTestId('login-button');

    fireEvent.press(loginButton);
    expect(mockOnLogin).toHaveBeenCalled();
  });

  it('navigue vers la page "Mot de passe oublié"', () => {
    const { getByTestId } = render(<Connection {...defaultProps} />);
    const forgotPasswordLink = getByTestId('forgot-password-link');

    fireEvent.press(forgotPasswordLink);
    expect(mockNavigateToForgotPassword).toHaveBeenCalled();
  });
});
