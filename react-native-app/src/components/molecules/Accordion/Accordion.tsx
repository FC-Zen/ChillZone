import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from './style';
import { Icon } from '@components/atoms';

type AccordionProps = {
  question: string;
  answer: string;
};

/**
 * @param detail instance of FaqDetail
 * 
 * @returns A custom accordion component with a clickable question and the answer displayed below.
 */
export const Accordion: React.FC<AccordionProps> = ({ question, answer }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleAccordion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <View style={styles.accordion}>
      <TouchableOpacity style={styles.header} onPress={handleAccordion}>
        <Text style={styles.title}>{question}</Text>
        <View style={[styles.iconContainer, { transform: [{ rotate: isExpanded ? '180deg' : '0deg' }] }]}>
          <Icon name="Arrow" />
        </View>
      </TouchableOpacity>
      {isExpanded && (
        <View style={styles.body}>
          <Text style={styles.answer}>{answer}</Text>
        </View>
      )}
    </View>
  );
};