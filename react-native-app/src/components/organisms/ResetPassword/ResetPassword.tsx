import React from 'react';
import { View, Text, Image } from 'react-native';
import styles from './style';
import { Button, Input } from '@components';

type ResetPasswordProps = {
  logo: any;
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

export const ResetPassword: React.FC<ResetPasswordProps> = ({
  logo,
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
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <Text style={styles.title}>{title}</Text>
      <View style={styles.inputContainer}>
        <Input
          icon="Lock"
          onChangeText={setInputPassword}
          placeholder={placeholderPassword}
          value={inputPassword}
          variant="password"
        />
      </View>
      <View style={styles.inputContainer}>
        <Input
          icon="Lock"
          onChangeText={setInputPassword2}
          placeholder={placeholderVerifyPassword}
          value={inputPassword2}
          variant="password"
        />
      </View>

      <Button title={buttonTitle} onPress={onModifyPress} />
    </View>
  );
};
