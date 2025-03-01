import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Connection } from './Connection';

describe('Connection Component', () => {
  it('affiche correctement les champs et le bouton', () => {
    const { getByPlaceholderText, getByText } = render(
      <Connection
        inputEmail=""
        setInputEmail={() => {}}
        inputPassword=""
        setInputPassword={() => {}}
        isChecked={false}
        setChecked={() => {}}
        onLogin={() => {}}
        logo={{ uri: 'https://example.com/logo.png' }}
        placeholderEmail="Entrez votre email"
        placeholderPassword="Entrez votre mot de passe"
        rememberMeLabel="Se souvenir de moi"
        forgotPasswordText="Mot de passe oublié ?"
        buttonText="Se connecter"
        navigateToForgotPassword={() => {}}
      />
    );

    expect(getByPlaceholderText('Entrez votre email')).toBeTruthy();
    expect(getByPlaceholderText('Entrez votre mot de passe')).toBeTruthy();
    expect(getByText('Se souvenir de moi')).toBeTruthy();
    expect(getByText('Mot de passe oublié ?')).toBeTruthy();
    expect(getByText('Se connecter')).toBeTruthy();
  });

  it('modifie correctement les champs email et mot de passe', () => {
    const mockSetEmail = jest.fn();
    const mockSetPassword = jest.fn();

    const { getByPlaceholderText } = render(
      <Connection
        inputEmail=""
        setInputEmail={mockSetEmail}
        inputPassword=""
        setInputPassword={mockSetPassword}
        isChecked={false}
        setChecked={() => {}}
        onLogin={() => {}}
        logo={{ uri: 'https://example.com/logo.png' }}
        placeholderEmail="Email"
        placeholderPassword="Mot de passe"
        rememberMeLabel="Se souvenir de moi"
        forgotPasswordText="Mot de passe oublié ?"
        buttonText="Se connecter"
        navigateToForgotPassword={() => {}}
      />
    );

    fireEvent.changeText(getByPlaceholderText('Email'), 'test@email.com');
    fireEvent.changeText(getByPlaceholderText('Mot de passe'), 'password123');

    expect(mockSetEmail).toHaveBeenCalledWith('test@email.com');
    expect(mockSetPassword).toHaveBeenCalledWith('password123');
  });

  it('active correctement la case "Se souvenir de moi"', () => {
    const mockSetChecked = jest.fn();

    const { getByText } = render(
      <Connection
        inputEmail=""
        setInputEmail={() => {}}
        inputPassword=""
        setInputPassword={() => {}}
        isChecked={false}
        setChecked={mockSetChecked}
        onLogin={() => {}}
        logo={{ uri: 'https://example.com/logo.png' }}
        placeholderEmail="Email"
        placeholderPassword="Mot de passe"
        rememberMeLabel="Se souvenir de moi"
        forgotPasswordText="Mot de passe oublié ?"
        buttonText="Se connecter"
        navigateToForgotPassword={() => {}}
      />
    );

    fireEvent.press(getByText('Se souvenir de moi'));

    expect(mockSetChecked).toHaveBeenCalledWith(true);
  });

  it('déclenche la fonction de connexion au clic sur le bouton', () => {
    const mockOnLogin = jest.fn();

    const { getByText } = render(
      <Connection
        inputEmail=""
        setInputEmail={() => {}}
        inputPassword=""
        setInputPassword={() => {}}
        isChecked={false}
        setChecked={() => {}}
        onLogin={mockOnLogin}
        logo={{ uri: 'https://example.com/logo.png' }}
        placeholderEmail="Email"
        placeholderPassword="Mot de passe"
        rememberMeLabel="Se souvenir de moi"
        forgotPasswordText="Mot de passe oublié ?"
        buttonText="Se connecter"
        navigateToForgotPassword={() => {}}
      />
    );

    fireEvent.press(getByText('Se connecter'));

    expect(mockOnLogin).toHaveBeenCalled();
  });
});
