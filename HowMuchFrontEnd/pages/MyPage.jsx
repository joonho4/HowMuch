import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { BottomNav } from '../components';
import { getProfile } from '../api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MyPage = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [courseData, setCourseData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
        const token = await AsyncStorage.getItem('accessToken');
        console.log('저장된 토큰:', token);
        
        if (!token) {
            throw new Error('토큰이 없습니다');
        }
        
        const userData = await getProfile({ accessToken: token });
        setUserInfo(userData);
        // tripPlans에서 dayPlans 추출
        if (userData.tripPlans && userData.tripPlans.length > 0) {
            const dayPlans = userData.tripPlans[0].dayPlans;
            console.log('Day Plans:', JSON.stringify(dayPlans, null, 2));
            setCourseData(dayPlans.map(day => ({
                id: day.id,
                location: day.morningActivity.activityName,
                theme: `${day.morningActivity.activityName}, ${day.afternoonActivity.activityName}`,
                budget: `${day.lunch.averagePrice + day.dinner.averagePrice}원`,
                isFavorite: userData.tripPlans[0].favorite
            })));
        }
        
        setLoading(false);
    } catch (error) {
        console.error('프로필 조회 에러:', error);
        setLoading(false);
    }
};


  const favoriteCount = courseData.filter(course => course.isFavorite).length;

  const renderCourseCard = ({ item }) => (
    <View style={styles.courseCard}>
      <Image
        source={{ uri: item.imageUrl || 'https://via.placeholder.com/150' }}
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

  if (loading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Text>로딩 중...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profileContainer}>
          <Image
            source={require('../assets/pngwing.com.png')}
            style={styles.profileImage}
          />
          <View>
            <Text style={styles.profileName}>{userInfo?.name || '사용자'} 님</Text>
            <Text style={styles.profileAge}>{userInfo?.email || ''}</Text>
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

      <FlatList
        data={courseData}
        renderItem={renderCourseCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={() => (
          <Text style={styles.emptyText}>저장된 코스가 없습니다.</Text>
        )}
      />
      
      <BottomNav />
    </View>
  );
};

// styles에 추가할 스타일
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
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    textAlign: 'center',
    color: '#666',
    marginTop: 20,
  },
});

export default MyPage;
