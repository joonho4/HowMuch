import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

export default function Signup({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/Logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <View style={styles.bottomContainer}>
        <Image
          source={require('../assets/Vector.png')}
          style={styles.waveBackground}
          resizeMode="cover"
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.Login} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.buttonText}>로그인</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.Signup} onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.buttonText}>회원가입</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

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
  logo: {
    width: 150,
    height: 150,
  },
  bottomContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  waveBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    bottom: 0,
  },
  buttonContainer: {
    marginBottom: 50,
    width: '100%',
    alignItems: 'center',
  },
  Login: {
    backgroundColor: '#FF9800',
    paddingVertical: 12,
    paddingHorizontal: 80,
    borderRadius: 10,
    marginBottom: 20,
  },
  Signup: {
    backgroundColor: '#FF9800',
    paddingVertical: 12,
    paddingHorizontal: 80,
    borderRadius: 10,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
