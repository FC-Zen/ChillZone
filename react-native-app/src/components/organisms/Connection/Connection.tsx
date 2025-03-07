import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './style';
import { Checkbox } from '@components/atoms';
import { Button, Input } from '@components/molecules';

export type ConnectionProps = {
  inputEmail: string;
  setInputEmail: (email: string) => void;
  inputPassword: string;
  setInputPassword: (password: string) => void;
  isChecked: boolean;
  setChecked: (checked: boolean) => void;
  onLogin: () => void;
  logo: any;
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
    <View style={styles.container} testID="connection-container">
      <Image source={logo} style={styles.logo} testID="logo-image" />

      <View style={styles.inputContainer} testID="email-input-container">
        <Input
          icon="User"
          onChangeText={setInputEmail}
          placeholder={placeholderEmail}
          value={inputEmail}
          variant="default"
          testID="email-input"
        />
      </View>

      <View style={styles.inputContainer} testID="password-input-container">
        <Input
          icon="Lock"
          onChangeText={setInputPassword}
          placeholder={placeholderPassword}
          value={inputPassword}
          variant="password"
          testID="password-input"
        />
      </View>

      <View style={styles.checkboxContainer} testID="checkbox-container">
        <Checkbox
          checked={isChecked}
          onChange={() => setChecked(!isChecked)}
          label={rememberMeLabel}
          testID="checkbox"
        />
      </View>

      <TouchableOpacity
        onPress={navigateToForgotPassword}
        testID="forgot-password-link"
      >
        <Text style={styles.underlineText}>{forgotPasswordText}</Text>
      </TouchableOpacity>

      <Button title={buttonText} onPress={onLogin} testID="login-button" />
    </View>
  );
};
