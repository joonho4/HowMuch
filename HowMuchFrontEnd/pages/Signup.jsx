import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { InputField, Button } from '../components';
import { postSignUp } from '../api';

const Signup = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false); // loading 상태 추가

  const handleSignup = async () => {
    if (!email || !password || !name) {
      Alert.alert('오류', '모든 필드를 입력해주세요.');
      return;
    }

    setLoading(true);
    try {
      await postSignUp({ email, password, name });
      Alert.alert('회원가입 성공', '로그인 페이지로 이동합니다.', [
        {
          text: '확인',
          onPress: () => navigation.navigate('Login')
        }
      ]);
    } catch (error) {
      let errorMessage = '회원가입에 실패했습니다.';
      
      if (error.response) {
        errorMessage = error.response.data.message || errorMessage;
      } else if (error.request) {
        errorMessage = '서버와 통신할 수 없습니다.';
      }
      
      Alert.alert('오류', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>회원가입</Text>
      
      <InputField
        placeholder="이름"
        value={name}
        onChangeText={setName}
        editable={!loading}
      />
      <InputField
        placeholder="이메일"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        editable={!loading}
      />
      <InputField
        placeholder="비밀번호"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        editable={!loading}
      />

      <Button 
        title={loading ? "처리중..." : "회원가입"} 
        onPress={handleSignup}
        disabled={loading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#FF9800',
  },
});

export default Signup;
