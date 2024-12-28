import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

export default function Information() {
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [isDevInfoOpen, setIsDevInfoOpen] = useState(false);

  return (
    <View style={styles.container}>
      {/* 배경 이미지 및 상단 */}
      <ImageBackground
        source={require('../assets/busan-city.png')}
        style={styles.headerImage}
      >
        <TouchableOpacity style={styles.backButton}>
          <Icon name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        {/* <Text style={styles.cityName}>부산</Text> */}
      </ImageBackground>

      {/* 가격 및 아이콘 */}
      <View style={styles.priceContainer}>
        <Text style={styles.priceText}>870,000원</Text>
        <Icon name="dollar-sign" size={20} color="#FFA500" />
      </View>

      {/* 탭 메뉴 */}
      <View style={styles.tabMenu}>
        <Text style={styles.tabItem}>숙소</Text>
        <Text style={styles.tabItem}>놀거리</Text>
        <Text style={[styles.tabItem, styles.activeTabItem]}>정보</Text>
      </View>

      {/* 정보 섹션 */}
      <ScrollView style={styles.content}>
        {/* 정보 */}
        <TouchableOpacity
          style={styles.accordionHeader}
          onPress={() => setIsInfoOpen(!isInfoOpen)}
        >
          <Text style={styles.accordionTitle}>정보</Text>
          <Icon name={isInfoOpen ? 'chevron-up' : 'chevron-down'} size={20} />
        </TouchableOpacity>
        {isInfoOpen && (
          <View style={styles.accordionContent}>
            <Text>지역: 부산</Text>
            <Text>사람: 12명</Text>
            <Text>테마: 바다, 맛집</Text>
            <Text>예산: 870,000 원</Text>
          </View>
        )}

        {/* 개발자 정보 */}
        <TouchableOpacity
          style={styles.accordionHeader}
          onPress={() => setIsDevInfoOpen(!isDevInfoOpen)}
        >
          <Text style={styles.accordionTitle}>개발자 정보</Text>
          <Icon name={isDevInfoOpen ? 'chevron-up' : 'chevron-down'} size={20} />
        </TouchableOpacity>
        {isDevInfoOpen && (
          <View style={styles.accordionContent}>
            <Text>개발자: 김도영</Text>
            <Text>전화번호: 010-1234-5678</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerImage: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  cityName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 16,
  },
  priceText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 8,
  },
  tabMenu: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tabItem: {
    paddingVertical: 10,
    fontSize: 16,
    color: '#888',
  },
  activeTabItem: {
    color: '#000',
    borderBottomWidth: 2,
    borderBottomColor: '#000',
  },
  content: {
    padding: 16,
  },
  accordionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  accordionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  accordionContent: {
    paddingVertical: 10,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 16,
  },
});
