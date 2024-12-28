import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const Tab = ({ title, activeTab, setActiveTab }) => {
  return (
    <TouchableOpacity
      style={[styles.tab, activeTab === title && styles.activeTab]}
      onPress={() => setActiveTab(title)}
    >
      <Text style={[styles.tabText, activeTab === title && styles.activeTabText]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#000',
  },
  tabText: {
    fontSize: 16,
    color: '#666',
  },
  activeTabText: {
    color: '#000',
    fontWeight: '600',
  },
});

export default Tab;
