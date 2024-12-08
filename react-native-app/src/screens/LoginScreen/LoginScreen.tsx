import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Input } from '@components';
import { useTranslation } from 'react-i18next';
import { translationService } from '@services/index';

export const LoginScreen: React.FC = () => {
  const { t } = useTranslation();
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.list}>
        <Input
          icon="User"
          onChangeText={setInputEmail}
          placeholder={t('fields.common.mail')}
          value={inputEmail}
          variant="default"
        />
        <Input
          icon="Lock"
          onChangeText={setInputPassword}
          placeholder={t('fields.auth.password')}
          value={inputPassword}
          variant="password"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    padding: 16,
  },
});
