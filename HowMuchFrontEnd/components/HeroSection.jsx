import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const HeroSection = () => {
  return (
    <View style={styles.heroContainer}>
      <Image
        source={require('../assets/image.png')} // 실제 프로젝트에서는 해당 이미지 경로로 변경 필요
        style={styles.heroImage}
        resizeMode="cover"
      />
    </View>
  );
};


const styles = StyleSheet.create({
    heroContainer: {
      height: 250,
      width: '100%',
    },
    heroImage: {
      width: '100%',
      height: '100%',
    },
  });
  
export default HeroSection;