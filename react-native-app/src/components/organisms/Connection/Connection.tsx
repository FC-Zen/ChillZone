import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './style';
import { Button, Checkbox, Input } from '@components';

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
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />

      <View style={styles.inputContainer}>
        <Input
          icon="User"
          onChangeText={setInputEmail}
          placeholder={placeholderEmail}
          value={inputEmail}
          variant="default"
        />
      </View>

      <View style={styles.inputContainer}>
        <Input
          icon="Lock"
          onChangeText={setInputPassword}
          placeholder={placeholderPassword}
          value={inputPassword}
          variant="password"
        />
      </View>

      <View style={styles.checkboxContainer}>
        <Checkbox
          checked={isChecked}
          onChange={() => setChecked(!isChecked)}
          label={rememberMeLabel}
        />
      </View>

      <TouchableOpacity onPress={navigateToForgotPassword}>
        <Text style={styles.underlineText}>{forgotPasswordText}</Text>
      </TouchableOpacity>

      <Button title={buttonText} onPress={onLogin} />
    </View>
  );
};
