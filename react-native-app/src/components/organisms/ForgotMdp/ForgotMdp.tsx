import React from 'react';
import { View, Text, Image } from 'react-native';
import styles from './style';
import { Button } from '@components';

type ForgotMdpProps = {
  logo: any;
  title: string;
  infoText: string;
  buttonTitle: string;
  onButtonPress: () => void;
};

export const ForgotMdp: React.FC<ForgotMdpProps> = ({
  logo,
  title,
  infoText,
  buttonTitle,
  onButtonPress,
}) => {
  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.txt}>{infoText}</Text>

      <Button title={buttonTitle} onPress={onButtonPress} />
    </View>
  );
};
