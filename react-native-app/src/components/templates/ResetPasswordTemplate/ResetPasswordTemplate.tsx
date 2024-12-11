import React from 'react';
import { View } from 'react-native';
import { VectorHeader, VectorBottom } from '@components';
import { ResetPassword } from '@components/organisms/ResetPassword';
import styles from './style';

type ResetPasswordTemplateProps = {
  logo: any;
  title: string;
  placeholderPassword: string;
  placeholderVerifyPassword: string;
  buttonTitle: string;
  onModifyPress: () => void;
  inputPassword: string; // Ajout pour le mot de passe
  setInputPassword: (value: string) => void; // Fonction pour mettre à jour le mot de passe
  inputPassword2: string; // Ajout pour la vérification du mot de passe
  setInputPassword2: (value: string) => void; // Fonction pour mettre à jour la vérification du mot de passe
};

export const ResetPasswordTemplate: React.FC<ResetPasswordTemplateProps> = ({
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
      <VectorHeader />
      <View style={styles.contentContainer}>
        <ResetPassword
          logo={logo}
          title={title}
          placeholderPassword={placeholderPassword}
          placeholderVerifyPassword={placeholderVerifyPassword}
          buttonTitle={buttonTitle}
          onModifyPress={onModifyPress}
          inputPassword={inputPassword}
          setInputPassword={setInputPassword}
          inputPassword2={inputPassword2}
          setInputPassword2={setInputPassword2}
        />
      </View>
      <VectorBottom />
    </View>
  );
};
