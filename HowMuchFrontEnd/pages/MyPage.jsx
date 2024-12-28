import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { BottomNav } from '../components';

const MyPage = () => {
  const courseData = [
    { id: '1', location: '부산', theme: '바다, 맛집', people: '6명', budget: '870,000원', isFavorite: true },
    { id: '2', location: '부산', theme: '바다, 맛집', people: '6명', budget: '870,000원', isFavorite: false },
    { id: '3', location: '부산', theme: '바다, 맛집', people: '6명', budget: '870,000원', isFavorite: true },
    { id: '4', location: '부산', theme: '바다, 맛집', people: '6명', budget: '870,000원', isFavorite: false },
  ];
  const favoriteCount = courseData.filter(course => course.isFavorite).length;

  const renderCourseCard = ({ item }) => (
    <View style={styles.courseCard}>
      <Image
        source={{ uri: 'https://via.placeholder.com/150' }} // 여기에 이미지 URL을 추가하세요.
        style={styles.courseImage}
      />
      <View style={styles.cardContent}>
        <Text style={styles.cardLocation}>{item.location}</Text>
        <Text style={styles.cardDetail}>테마: {item.theme}</Text>
        <Text style={styles.cardDetail}>인원: {item.people}</Text>
        <Text style={styles.cardDetail}>예산: {item.budget}</Text>
      </View>
      <TouchableOpacity>
        <Icon
          name={item.isFavorite ? 'star' : 'star-outline'}
          size={24}
          color={item.isFavorite ? '#FFA500' : '#C4C4C4'}
          style={styles.favoriteIcon}
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* 사용자 정보 */}
      <View style={styles.header}>
        <View style={styles.profileContainer}>
          <Image
            source={require('../assets/pngwing.com.png')} // 프로필 이미지 URL 추가
            style={styles.profileImage}
          />
          <View>
            <Text style={styles.profileName}>김도영 님</Text>
            <Text style={styles.profileAge}>www@gmail.com</Text>
          </View>
        </View>
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{courseData.length}</Text>
            <Text style={styles.statLabel}>코스 갯수</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{favoriteCount}</Text>
            <Text style={styles.statLabel}>즐겨찾기</Text>
          </View>
        </View>
      </View>

      {/* 코스 리스트 */}
      <FlatList
        data={courseData}
        renderItem={renderCourseCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
      
      {/* 하단 네비게이션 */}
      <BottomNav />
    </View>
  );
};

export default MyPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    backgroundColor: '#F9F9F9',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EDEDED',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  profileAge: {
    color: '#888888',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },
  statBox: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  statLabel: {
    color: '#888888',
  },
  listContainer: {
    padding: 16,
  },
  courseCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    padding: 8,
    borderWidth: 1,
    borderColor: '#EDEDED',
    borderRadius: 8,
  },
  courseImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 16,
  },
  cardContent: {
    flex: 1,
  },
  cardLocation: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardDetail: {
    color: '#555555',
    marginTop: 4,
  },
  favoriteIcon: {
    padding: 8,
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#EDEDED',
  },
});
