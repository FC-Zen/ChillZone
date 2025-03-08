import { PageHeader } from '@components/molecules/PageHeader';
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { styles } from './style';
import { useNavigation } from '@hooks';
import { getFaq } from '@services';
import { FaqTemplate } from '@components/templates/FaqTemplate';
import { FaqCategory } from '@services/FaqServices';
import { ROUTE } from '@enums';
import { useTranslation } from 'react-i18next';
import { colors, typography } from '@theme';

export const FaqScreen: React.FC = () => {
  const navigation = useNavigation();
  // Données pour la Faq
  const [FaqData, setFaqData] = useState<FaqCategory[]>();
  const { t } = useTranslation();

  // Chargement des données des restaurants au démarrage
  useEffect(() => {
    const fetchData = async () => {
      const Faq = await getFaq();
      setFaqData(Faq);
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <PageHeader
        title={t('headers.faq')}
        variant="back"
        onBackPress={() => navigation.goBack()}
        icon={{
          name: 'Cross',
          color: colors.black,
          width: 16,
          height: 16,
        }}
      />
      {FaqData ? <FaqTemplate categories={FaqData} />: <Text style={
        {
          textAlign: 'center',
          marginTop: 20,
          fontSize: typography.h1.fontSize,
          color: colors.warn,
        }
      }>Cet établissement n'a pas de FAQ</Text>}
    </View>
  );
};
