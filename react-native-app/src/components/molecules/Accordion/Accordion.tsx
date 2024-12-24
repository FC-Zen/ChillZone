import { FaqDetail } from '@services/FaqServices';
import React from 'react';
import { List } from 'react-native-paper';
import { styles } from './style';

/**
 * @param detail instance of FaqDetail
 *  
 * @returns An accordion with the question as a title and the answer below when you click on it
 */
export const Accordion: React.FC<FaqDetail> = (detail:FaqDetail) => {
  return (
    <>
      <List.Accordion 
        title={detail.question} 
        titleNumberOfLines={2}  // Limite le texte à 2 lignes
        style={styles.accordion} 
        titleStyle={styles.title}>
        <List.Item title={detail.answer} style={styles.answer} titleNumberOfLines={5}/>
      </List.Accordion>
    </>
  );
};
