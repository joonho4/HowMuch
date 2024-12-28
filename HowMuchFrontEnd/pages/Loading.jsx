import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const { width } = Dimensions.get('window');

const Loading = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('숙소');

  const tabItems = ['숙소', '놀거리', '정보'];

  return (
    <View style={styles.container}>
      {/* Header Image */}
      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/busan-city.png')}
          style={styles.headerImage}
        />
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="chevron-left" size={24} color="white" />
        </TouchableOpacity>
        <View style={styles.overlay}>
          <Text style={styles.cityName}>부산</Text>
        </View>
      </View>

      {/* Price Bar */}
      <View style={styles.priceBar}>
        <TouchableOpacity>
          <Icon name="star" size={24} color="#666" />
        </TouchableOpacity>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>870,000원</Text>
          <Icon name="dollar-sign" size={20} color="#FFB800" />
        </View>
      </View>

      {/* Navigation Tabs */}
      <View style={styles.tabContainer}>
        {tabItems.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tab,
              activeTab === tab && styles.activeTab
            ]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[
              styles.tabText,
              activeTab === tab && styles.activeTabText
            ]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Content */}
      <ScrollView style={styles.content}>
        <TouchableOpacity style={styles.placeCard}>
          <Image
            source={require('../assets/hotel-room.png')}
            style={styles.placeImage}
          />
          <View style={styles.placeInfo}>
            <View style={styles.placeHeader}>
              <Text style={styles.placeName}>
                부산 시그니엘 파크 호텔
              </Text>
              <View style={styles.viewMoreContainer}>
                <Text style={styles.viewMore}>숙소 위치 보기</Text>
                <Icon name="chevron-right" size={16} color="#666" />
              </View>
            </View>
            <Text style={styles.placePrice}>375,000원</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.placeCard}>
          <Image
            source={require('../assets/busan-city.png')}
            style={styles.placeImage}
          />
          <View style={styles.placeInfo}>
            <View style={styles.placeHeader}>
              <Text style={styles.placeName}>
                베이 파크 호텔
              </Text>
              <View style={styles.viewMoreContainer}>
                <Text style={styles.viewMore}>숙소 위치 보기기</Text>
                <Icon name="chevron-right" size={16} color="#666" />
              </View>
            </View>
            <Text style={styles.placePrice}>280,000원</Text>
          </View>
        </TouchableOpacity>
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
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
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
  content: {
    flex: 1,
    padding: 16,
  },
  placeCard: {
    marginBottom: 20,
    borderRadius: 12,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  placeImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  placeInfo: {
    padding: 16,
  },
  placeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  placeName: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  viewMoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  viewMore: {
    fontSize: 14,
    color: '#666',
  },
  placePrice: {
    fontSize: 14,
    color: '#666',
  },
});

export default Loading;