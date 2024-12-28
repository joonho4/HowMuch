import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const BottomNav = () => {
  const navigation = useNavigation()

  return (
    <View style={styles.bottomNav}>
      <TouchableOpacity style={styles.navButton}  onPress={() => navigation.navigate('Home')}>
        <Icon name="home" size={24} color="#666" />
        <Text style={styles.navText}>홈</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('MyPage')}>
        <Icon name="user" size={24} color="#666" />
        <Text style={styles.navText}>마이</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  navButton: {
    alignItems: 'center',
  },
  navText: {
    marginTop: 4,
    fontSize: 12,
    color: '#666',
  },
});

export default BottomNav;
