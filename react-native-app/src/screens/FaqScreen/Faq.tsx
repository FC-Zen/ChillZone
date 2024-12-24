import { PageHeader } from '@components/molecules/PageHeader';
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { styles } from './style';
import { useNavigation } from '@hooks';
import { getFaq } from '@services';
import { FaqTemplate, FaqTemplateProps } from '@components/templates/FaqTemplate';
import { FaqCategory } from '@services/FaqServices';
import { ROUTE } from '@enums';

export const FaqScreen: React.FC = () => {
  
  const navigation = useNavigation();
  // Données pour la Faq
  const [FaqData, setFaqData] = useState<FaqCategory[]>();
  
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
      <PageHeader title='Foire aux question' onBackPress={() => navigation.navigate(ROUTE.HOME)} />
      {FaqData && <FaqTemplate categories={FaqData}/>}
    </View>
  );
};
