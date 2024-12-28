import React from 'react';
import { View, StyleSheet } from 'react-native';
import Logo from '../components/Logo';
import WaveBackground from '../components/WaveBackground';
import { Button } from '../components';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Logo />
      </View>

      <View style={styles.bottomContainer}>
        <WaveBackground />
        <View style={styles.buttonContainer}>
          <Button title="로그인" onPress={() => navigation.navigate('Login')} />
          <Button title="회원가입" onPress={() => navigation.navigate('Signup')} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  logoContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  buttonContainer: {
    marginBottom: 50,
    width: '100%',
    alignItems: 'center',
  },
});

export default HomeScreen;
