import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './style';
import { Button, Checkbox, Input } from '@components';
import { useTranslation } from 'react-i18next';
import { logoIUT } from '@assets/Images';
import { useNavigation } from '@hooks';
import { ROUTE } from '@enums';

export const Connection = () => {
  const { t } = useTranslation();
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [isChecked, setChecked] = useState(false);
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image source={logoIUT} style={styles.logo} />

      <View style={styles.inputContainer}>
        <Input
          icon="User"
          onChangeText={setInputEmail}
          placeholder={t('fields.common.mail')}
          value={inputEmail}
          variant="default"
        />
      </View>

      <View style={styles.inputContainer}>
        <Input
          icon="Lock"
          onChangeText={setInputPassword}
          placeholder={t('fields.auth.password')}
          value={inputPassword}
          variant="password"
        />
      </View>

      <View style={styles.checkboxContainer}>
        <Checkbox
          checked={isChecked}
          onChange={() => setChecked(!isChecked)}
          label={t('categories.rememberMe')}
        />
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate(ROUTE.FORGOT_PASSWORD)}
      >
        <Text style={styles.underlineText}>{t('questions.pwd')}</Text>
      </TouchableOpacity>

      <Button
        title={t('buttons.auth.connect')}
        onPress={() => {}} // on mettra la route pour la page Home
      />
    </View>
  );
};
