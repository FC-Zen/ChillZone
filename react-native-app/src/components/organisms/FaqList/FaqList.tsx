import React from 'react';
import { styles } from './style';
import { Accordion } from '@components/molecules/Accordion';
import { List } from 'react-native-paper';
import { FaqCategory } from '@services/FaqServices';
import { View, Text, TouchableOpacity } from 'react-native';
import { Icon } from '@components/atoms';
import { colors } from '@theme';

export const FaqList: React.FC<FaqCategory> = ({category, faq_details}) => {
  const [expanded, setExpanded] = React.useState(false);
  
  const handlePress = () => setExpanded(!expanded);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.title}>{category}</Text>
        <View style={[styles.iconContainer, { transform: [{ rotate: expanded ? '180deg' : '0deg' }] }]}>
          <Icon name="Arrow" color={colors.black}/>
        </View>
      </TouchableOpacity>
      <List.Section style={expanded ? {display:'flex'} : { display:'none'}}>
        {faq_details.map((data) => <Accordion question={data.question} answer={data.answer} /> )}
      </List.Section>
    </View>
  );
};
