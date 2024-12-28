import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const RecommendButton = () => {
  const navigation = useNavigation(); // navigate를 navigation으로 수정

  return (
    <TouchableOpacity 
      style={styles.recommendButton}
      onPress={() => navigation.navigate('KoseuChucheon')}
    >
      <Text style={styles.recommendButtonText}>코스 추천 받기</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  recommendButton: {
    backgroundColor: '#FF9500',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 32,
  },
  recommendButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RecommendButton;
