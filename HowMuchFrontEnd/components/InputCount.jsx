
import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';

const InputCount = ({ placeholder, value, onChangeText, unit }) => (
  <View style={styles.inputContainer}>
    <TextInput
      style={styles.inputText}
      placeholder={placeholder}
      keyboardType="numeric"
      value={value}
      onChangeText={onChangeText}
    />
    <Text style={styles.unitText}>{unit}</Text>
  </View>
);

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingHorizontal: 16,
  },
  inputText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  unitText: {
    fontSize: 16,
    color: '#666',
    marginLeft: 8,
  },
});

export default InputCount;
