import React from 'react';
import { Image, StyleSheet } from 'react-native';

const WaveBackground = () => (
  <Image
    source={require('../assets/Vector.png')}
    style={styles.waveBackground}
    resizeMode="cover"
  />
);

const styles = StyleSheet.create({
  waveBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    bottom: 0,
  },
});

export default WaveBackground;
