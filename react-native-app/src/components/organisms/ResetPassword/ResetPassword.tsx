import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './style';
import { Button, Input } from '@components';
import { useTranslation } from 'react-i18next';
import { logoIUT } from '@assets/Images';
import { useNavigation } from '@hooks';
import { ROUTE } from '@enums';

export const ResetPassword = () => {
  const { t } = useTranslation();
  const [inputPassword, setInputPassword] = useState('');
  const [inputPassword2, setInputPassword2] = useState('');
  // const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image source={logoIUT} style={styles.logo} />
      <Text style={styles.title}>{t('headers.pwdReset')}</Text>
      <View style={styles.inputContainer}>
        <Input
          icon="Lock"
          onChangeText={setInputPassword}
          placeholder={t('fields.auth.newPassword')}
          value={inputPassword}
          variant="password"
        />
      </View>
      <View style={styles.inputContainer}>
        <Input
          icon="Lock"
          onChangeText={setInputPassword2}
          placeholder={t('fields.auth.verifyNewPassword')}
          value={inputPassword2}
          variant="password"
        />
      </View>

      <Button title={t('buttons.actions.modify')} onPress={() => {}} />
    </View>
  );
};
