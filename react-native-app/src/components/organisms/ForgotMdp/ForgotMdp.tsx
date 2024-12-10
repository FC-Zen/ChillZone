import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './style';
import { Button, Checkbox, Input } from '@components';
import { useTranslation } from 'react-i18next';
import { logoIUT } from '@assets/Images';
import { useNavigation } from '@hooks';
import { ROUTE } from '@enums';

export const ForgotMdp = () => {
  const { t } = useTranslation();
  const [inputEmail, setInputEmail] = useState('');
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image source={logoIUT} style={styles.logo} />
      <Text style={styles.title}>{t('headers.pwdReset')}</Text>

      <Text style={styles.txt}>{t('questions.infoPwd')}</Text>

      <Button
        title={t('buttons.auth.connect')}
        onPress={() => navigation.navigate(ROUTE.LOGIN_SCREEN)}
      />
    </View>
  );
};
