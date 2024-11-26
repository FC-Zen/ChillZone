import React, { useRef } from 'react';
import { Animated, View, StyleSheet, Button } from 'react-native';

export const TranslateAnimation = () => {
  const translateValue = useRef(new Animated.Value(0)).current;

  const startAnimation = () => {
    Animated.timing(translateValue, {
      toValue: 100,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.box, { transform: [{ translateX: translateValue }] }]} />
      <Button title="Start Animation" onPress={startAnimation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: 'blue',
  },
});

export default TranslateAnimation;