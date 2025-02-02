import React from 'react';
import { View, Image } from 'react-native';
import { NavigationBar } from '@components/molecules';
import { styles } from './style';

type RDCTemplateProps = {
  imageSource: any;
  onSelectFloor: (floor: string) => void;
};

export const RDCTemplate: React.FC<RDCTemplateProps> = ({
  imageSource,
  onSelectFloor,
}) => {
  return (
    <View style={styles.cont}>
      <View style={styles.container}>
        <Image source={imageSource} style={styles.image} />
      </View>
      <NavigationBar onSelectFloor={onSelectFloor} selectedFloor="RDC" />
    </View>
  );
};
