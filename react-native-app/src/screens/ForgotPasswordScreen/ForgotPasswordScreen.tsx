import React, { useState } from 'react';
import { View } from 'react-native';
import { ForgotPasswordTemplate } from '@components';
import { useNavigation } from '@hooks';
import { ROUTE } from '@enums';
import { styles } from './style';
import { t } from 'i18next';
import { sendPasswordRecoveryEmail } from '@services';


export const ForgotPasswordScreen: React.FC = () => {
  const navigation = useNavigation();
  const [inputEmail, setInputEmail] = useState('');

  const handleSendPress = async () => {
    try{
      const response = await sendPasswordRecoveryEmail({email: inputEmail})
    }catch(error:any){
      const errorMessage = error instanceof Error ? error.message : 'Une erreur est survenue.'
    }
    
    navigation.navigate(ROUTE.FORGOT_MDP);
  };

  return (
    <View style={styles.container}>
      <ForgotPasswordTemplate
        onSendPress={handleSendPress}
        headerText={t('headers.pwdReset')}
        placeholderText={t('fields.common.mail')}
        buttonTitle={t('buttons.actions.send')}
        inputEmail={inputEmail}
        setInputEmail={setInputEmail}
      />
    </View>
  );
};
