import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const PriceBar = () => {
  return (
    <View style={styles.priceBar}>
      <TouchableOpacity>
        <Icon name="star" size={24} color="#666" />
      </TouchableOpacity>
      <View style={styles.priceContainer}>
        <Text style={styles.price}>870,000원</Text>
        <Icon name="dollar-sign" size={20} color="#FFB800" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  priceBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  price: {
    fontSize: 18,
    fontWeight: '600',
  },
});

export default PriceBar;
