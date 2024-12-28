import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const CheckboxGroup = ({ items, selectedItems, onToggle }) => {
  const handleSelect = (item) => {
    if (selectedItems.includes(item)) {
      onToggle([]);
    } else {
      onToggle([item]);
    }
  };

  return (
    <View style={styles.checkboxGroup}>
      {items.map((item) => (
        <TouchableOpacity
          key={item}
          style={[
            styles.checkbox,
            selectedItems.includes(item) && styles.checkboxSelected,
          ]}
          onPress={() => handleSelect(item)}
        >
          <Text
            style={[
              styles.checkboxText,
              selectedItems.includes(item) && styles.checkboxTextSelected,
            ]}
          >
            {item}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  checkboxGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  checkbox: {
    flex: 1,
    height: 40,
    backgroundColor: '#FFF',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    margin: 4,
  },
  checkboxSelected: {
    backgroundColor: '#FF9500',
    borderColor: '#FF9500',
  },
  checkboxText: {
    fontSize: 14,
    color: '#333',
  },
  checkboxTextSelected: {
    color: '#FFF',
  },
});

export default CheckboxGroup;
