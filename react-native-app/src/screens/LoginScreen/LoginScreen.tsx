import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from '@components/index';
import { useTranslation } from 'react-i18next';
import { translationService } from '@/services/index';

export const LoginScreen: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <View style={styles.container}>
      <View style={styles.list}>
        <Button title={t('buttons.auth.connect')} onPress={() => console.log(translationService.getCurrentLanguage())} />
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
