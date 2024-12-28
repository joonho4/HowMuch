import React from 'react';
import { Image, StyleSheet } from 'react-native';

const Logo = () => (
  <Image
    source={require('../assets/Logo.png')}
    style={styles.logo}
    resizeMode="contain"
  />
);

const styles = StyleSheet.create({
  logo: {
    width: 150,
    height: 150,
  },
});

export default Logo;
