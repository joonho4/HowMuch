import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Tab, } from '../components';

const Enjoy = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('놀거리');

  const tabItems = ['숙소', '놀거리', '정보'];

  return (
    <View style={styles.container}>
      {/* Header Image */}
      <View style={styles.imageContainer}>
        <Image source={require('../assets/busan-city.png')} style={styles.headerImage} />
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" size={24} color="white" />
        </TouchableOpacity>
        <View style={styles.overlay}>
          <Text style={styles.cityName}>부산</Text>
        </View>
      </View>

      {/* Price Bar */}
      <PriceBar />

      {/* Navigation Tabs */}
      <View style={styles.tabContainer}>
        {tabItems.map((tab) => (
          <Tab key={tab} title={tab} activeTab={activeTab} setActiveTab={setActiveTab} />
        ))}
      </View>

      {/* Content */}
      <ScrollView style={styles.content}>
        <PlaceCard
          image={require('../assets/hotel-room.png')}
          name="아메리칸빌리지"
          price="평균 ~ 원"
          onPress={() => {}}
        />
        <PlaceCard
          image={require('../assets/busan-city.png')}
          name="한다솔"
          price="평균 ~ 원"
          onPress={() => {}}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageContainer: {
    height: 250,
    width: '100%',
  },
  headerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  backButton: {
    position: 'absolute',
    top: 48,
    left: 16,
    zIndex: 2,
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  cityName: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  content: {
    flex: 1,
    padding: 16,
  },
});

export default Enjoy;