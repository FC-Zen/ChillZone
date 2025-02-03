import React, { useState } from 'react';
import { View } from 'react-native';
import { styles } from './style';
import {
  BottomNavbar,
  Floor1Template,
  PageHeader,
  RDCTemplate,
  TopBar,
} from '@components';
import { rdc, floor1 } from '@assets/Images';
import { useTranslation } from 'react-i18next';

export const NavigationScreen = () => {
  const [selectedFloor, setSelectedFloor] = useState('RDC');

  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <TopBar />
      <PageHeader title={t('headers.map')} variant="default" />

      {selectedFloor === 'RDC' && (
        <RDCTemplate
          imageSource={rdc}
          onSelectFloor={() => setSelectedFloor('Floor1')}
        />
      )}

      {selectedFloor === 'Floor1' && (
        <Floor1Template
          imageSource={floor1}
          onSelectFloor={() => setSelectedFloor('RDC')}
        />
      )}

      <BottomNavbar activeIcon="Navigation" />
    </View>
  );
};
