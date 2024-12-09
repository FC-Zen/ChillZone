import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './style';
import { Button, Checkbox, Input } from '@components';
import { useTranslation } from 'react-i18next';
import { logoIUT } from '@assets/Images';
import { useNavigation } from '@hooks';
import { ROUTE } from '@enums';

export const ForgotPassword = () => {
  const { t } = useTranslation();
  const [inputEmail, setInputEmail] = useState('');
  // const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image source={logoIUT} style={styles.logo} />
      <Text style={styles.title}>{t('headers.pwdReset')}</Text>
      <View style={styles.inputContainer}>
        <Input
          icon="Inbox"
          onChangeText={setInputEmail}
          placeholder={t('fields.common.mail')}
          value={inputEmail}
          variant="default"
        />
      </View>

      <Button title={t('buttons.actions.send')} onPress={() => {}} />
    </View>
  );
};
