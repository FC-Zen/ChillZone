import React from 'react';
import { styles } from './style';
import { Accordion } from '@components/molecules/Accordion';
import { List } from 'react-native-paper';
import { FaqCategory } from '@services/FaqServices';
import { View, Text, TouchableOpacity } from 'react-native';

export const FaqList: React.FC<FaqCategory> = ({category, faq_details}) => {
  const [expanded, setExpanded] = React.useState(false);
  
  const handlePress = () => setExpanded(!expanded);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePress}>
        <Text style={styles.title}>{category}</Text>
      </TouchableOpacity>
      <List.Section style={expanded ? {display:'flex'} : { display:'none'}}>
        {faq_details.map((data) => <Accordion question={data.question} answer={data.answer} /> )}
      </List.Section>
    </View>
  );
};
