import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { BottomNav } from '../components';
import { getProfile } from '../api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MyPage = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [tripPlans, setTripPlans] = useState([]);
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

      // tripPlans 데이터를 처리
      if (userData.tripPlans && userData.tripPlans.length > 0) {
        const processedTripPlans = userData.tripPlans.map((plan) => ({
          id: plan.dayPlans[0]?.id || Math.random().toString(), // 첫 번째 DayPlan의 ID 사용
          place: plan.place,
          thema: plan.thema,
          totalExpense: plan.totalExpense,
          favorite: plan.favorite,
        }));
        setTripPlans(processedTripPlans);
      }

      setLoading(false);
    } catch (error) {
      console.error('프로필 조회 에러:', error);
      setLoading(false);
    }
  };

  const favoriteCount = tripPlans.filter((plan) => plan.favorite).length;

  const renderTripPlanCard = ({ item }) => (
    <View style={styles.courseCard}>
      <Image
        source={{ uri: item.imageUrl || 'https://via.placeholder.com/150' }}
        style={styles.courseImage}
      />
      <View style={styles.cardContent}>
        <Text style={styles.cardDetail}>테마: {item.thema}</Text>
        <Text style={styles.cardDetail}>지역: {item.place}</Text>
        <Text style={styles.cardDetail}>예산: {item.totalExpense.toLocaleString()}원</Text>
      </View>
      <TouchableOpacity>
        <Icon
          name={item.favorite ? 'star' : 'star-outline'}
          size={24}
          color={item.favorite ? '#FFA500' : '#C4C4C4'}
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
      {/* 사용자 정보 */}
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
        {/* 통계 */}
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{tripPlans.length}</Text>
            <Text style={styles.statLabel}>여행 계획 갯수</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{favoriteCount}</Text>
            <Text style={styles.statLabel}>즐겨찾기</Text>
          </View>
        </View>
      </View>

      {/* 여행 계획 리스트 */}
      <FlatList
        data={tripPlans}
        renderItem={renderTripPlanCard}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={() => (
          <Text style={styles.emptyText}>저장된 여행 계획이 없습니다.</Text>
        )}
      />

      {/* 하단 네비게이션 */}
      <BottomNav />
    </View>
  );
};

// 스타일 정의
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
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  courseCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 8,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#EDEDED',
    borderRadius: 8,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  courseImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 16,
  },
  cardContent: {
    flexGrow: 1,
    flexShrink: 1,
  },
});

export default MyPage;
