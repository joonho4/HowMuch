
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const Recommend = ({ onPress }) => (
  <TouchableOpacity style={styles.recommendButton} onPress={onPress}>
    <Text style={styles.recommendButtonText}>추천 받기</Text>
    <Icon name="chevron-right" size={24} color="#FFF" />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  recommendButton: {
    backgroundColor: '#FF9500',
    height: 56,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  recommendButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
});

export default Recommend;
