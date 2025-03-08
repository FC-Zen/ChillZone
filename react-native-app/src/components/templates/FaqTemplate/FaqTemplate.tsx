import { FaqList } from '@components/organisms/FaqList';
import { FaqCategory } from '@services/FaqServices';
import React from 'react';
import { ScrollView } from 'react-native';
import { styles } from './style';

export type FaqTemplateProps = {
  categories: FaqCategory[]
};

export const FaqTemplate: React.FC<FaqTemplateProps> = ({categories}) => {
  return(
    <ScrollView style={styles.scrollView}>
      {categories.map((data,index) => <FaqList key={`FaqList-${index}`} category={data.category} questions={data.questions} />)}
    </ScrollView>
  );
};
