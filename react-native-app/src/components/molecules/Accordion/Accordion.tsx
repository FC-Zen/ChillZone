import React from 'react';
import { List } from 'react-native-paper';
import { Text } from 'react-native';
import { styles } from './style';
import { Icon } from '@components/atoms';

type AccordionProps = {
  question: string;
  answer: string;
}; //Dois toujours être égale à FaqDetail de '@services/FaqServices' pour l'intégration de la Faq 

/**
 * @param detail instance of FaqDetail
 *  
 * @returns An accordion with the question as a title and the answer below when you click on it
 */
export const Accordion: React.FC<AccordionProps> = (detail) => {
  return (
    <>
      <List.Accordion 
        title={detail.question} 
        titleNumberOfLines={2}  // Limite le texte à 2 lignes
        style={styles.accordion} 
        titleStyle={styles.title}
        right={props => <Icon name='Arrow' />}>
        <Text style={styles.answer}>{detail.answer}</Text>
      </List.Accordion>
    </>
  );
};
