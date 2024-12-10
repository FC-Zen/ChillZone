import React from 'react';
import { View } from 'react-native';
import { VectorHeader, VectorBottom } from '@components';
import { ForgotMdp } from '@components/organisms';
import styles from './style';

type ForgotMdpTemplateProps = {
  logo: any;
  title: string;
  infoText: string;
  buttonTitle: string;
  onButtonPress: () => void;
};

export const ForgotMdpTemplate: React.FC<ForgotMdpTemplateProps> = ({
  logo,
  title,
  infoText,
  buttonTitle,
  onButtonPress,
}) => {
  return (
    <View style={styles.container}>
      <VectorHeader />
      <View style={styles.contentContainer}>
        <ForgotMdp
          logo={logo}
          title={title}
          infoText={infoText}
          buttonTitle={buttonTitle}
          onButtonPress={onButtonPress}
        />
      </View>
      <VectorBottom />
    </View>
  );
};
