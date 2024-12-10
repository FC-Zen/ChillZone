import React from 'react';
import { View } from 'react-native';
import { VectorHeader, VectorBottom } from '@components';
import { ForgotPassword } from '@components/organisms';
import styles from './style';
import { logoIUT } from '@assets/Images';

type ForgotPasswordTemplateProps = {
  onSendPress: () => void;
  headerText: string;
  placeholderText: string;
  buttonTitle: string;
  inputEmail: string; // Ajout pour l'email
  setInputEmail: (email: string) => void; // Ajout pour la fonction de mise à jour de l'email
};

export const ForgotPasswordTemplate: React.FC<ForgotPasswordTemplateProps> = ({
  onSendPress,
  headerText,
  placeholderText,
  buttonTitle,
  inputEmail,
  setInputEmail,
}) => {
  return (
    <View style={styles.container}>
      <VectorHeader />
      <View style={styles.contentContainer}>
        <ForgotPassword
          logo={logoIUT}
          headerText={headerText}
          placeholderText={placeholderText}
          buttonTitle={buttonTitle}
          onSendPress={onSendPress}
          inputEmail={inputEmail} // Passage de l'email
          setInputEmail={setInputEmail} // Passage de la fonction de mise à jour de l'email
        />
      </View>
      <VectorBottom />
    </View>
  );
};
