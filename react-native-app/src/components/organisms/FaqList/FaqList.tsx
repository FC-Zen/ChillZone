import React from 'react';
import { styles } from './style';
import { Accordion } from '@components/molecules/Accordion';
import { List } from 'react-native-paper';
import { FaqCategory } from '@services/FaqServices';
import { View, Text, TouchableOpacity } from 'react-native';
import { Icon } from '@components/atoms';
import { colors } from '@theme';

export const FaqList: React.FC<FaqCategory> = ({category, questions}) => {
  const [expanded, setExpanded] = React.useState(false);
  //console.log("Faq :", questions);
  
  const handlePress = () => setExpanded(!expanded);

  return (
    <View style={styles.container}>
      <View style={styles.button} >
        <Text style={styles.title} onPress={handlePress}>{category}</Text>
        <TouchableOpacity 
            style={[styles.iconContainer, { transform: [{ rotate: expanded ? '180deg' : '0deg' }] }]}
            onPress={handlePress}
          >
          <Icon name="Arrow" color={colors.black} onPress={handlePress}/>
        </TouchableOpacity>
      </View>
      <List.Section style={expanded ? {display:'flex'} : { display:'none'}}>
        {questions.map((data) => <Accordion question={data.question} answer={data.answer} /> )}
      </List.Section>
    </View>
  );
};
