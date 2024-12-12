// src/components/molecules/PageHeader/PageHeader.tsx
import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from '../../atoms/Icons/Icon';
import Text from '../../atoms/Text/Text';

interface PageHeaderProps {
  title: string;
  onBackPress?: () => void;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, onBackPress }) => {
  return (
    <View style={styles.container}>
      {onBackPress && (
        <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
          <Icon name="Lock" color="#fff" style={styles.icon} />
        </TouchableOpacity>
      )}
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 52,
    paddingHorizontal: 30,
    backgroundColor: '#fff',
  },
  backButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 16,
    height: 16,
    marginRight: 10,
  },
  icon: {
    width: 16,
    height: 16,
  },
  title: {
    width: 326,
    color: '#000', // Utilisez la couleur appropriée si vous avez une variable CSS
    textAlign: 'center',
    fontFamily: 'Montserrat',
    fontSize: 24,
    fontWeight: '600',
    lineHeight: 28,
  },
});

export default PageHeader;
