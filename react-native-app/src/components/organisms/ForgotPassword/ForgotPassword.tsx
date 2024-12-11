import React from 'react';
import { View, Text, Image } from 'react-native';
import styles from './style';
import { Button, Input } from '@components';

type ForgotPasswordProps = {
  logo: any;
  headerText: string;
  placeholderText: string;
  buttonTitle: string;
  onSendPress: () => void;
  inputEmail: string;
  setInputEmail: (email: string) => void;
};

export const ForgotPassword: React.FC<ForgotPasswordProps> = ({
  logo,
  headerText,
  placeholderText,
  buttonTitle,
  onSendPress,
  inputEmail,
  setInputEmail,
}) => {
  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <Text style={styles.title}>{headerText}</Text>
      <View style={styles.inputContainer}>
        <Input
          icon="Inbox"
          onChangeText={setInputEmail}
          placeholder={placeholderText}
          value={inputEmail}
          variant="default"
        />
      </View>

      <Button title={buttonTitle} onPress={onSendPress} />
    </View>
  );
};
