import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { getRecommendation } from '../api';
import { Tab } from '../components';

const Enjoy = ({ route, navigation }) => {
  const [activeTab, setActiveTab] = useState('일정');
  const [loading, setLoading] = useState(true);
  const [tripPlan, setTripPlan] = useState(null); // 여행 일정 데이터
  const { recommendData } = route.params; // 이전 화면에서 전달받은 추천 데이터

  const tabItems = ['일정', '숙소', '놀거리'];

  useEffect(() => {
    fetchRecommendation();
  }, []);

  const fetchRecommendation = async () => {
    if (tripPlan) return; // 이미 데이터가 있으면 요청하지 않음
  
    try {
      const response = await getRecommendation(recommendData.budget, recommendData.thema, recommendData.age, recommendData.destination, recommendData.travelers, recommendData.date);
      setTripPlan(response.recommendation); // 응답 데이터 저장
      setLoading(false);
    } catch (error) {
      console.error('추천 조회 에러:', error);
      setLoading(false);
    }
  };
  
  const renderAccommodations = () => {
    if (!tripPlan?.tripPlan[0]) return null;
    
    const accommodations = Object.values(tripPlan.tripPlan[0])
      .filter(day => day.accommodation && day.accommodation.name)
      .map(day => day.accommodation);
  
    return (
      <ScrollView contentContainerStyle={styles.accommodationContainer}>
        {accommodations.map((acc, index) => (
          <TouchableOpacity 
            key={index}
            style={styles.accommodationCard}
            onPress={() => acc.websiteURL && Linking.openURL(acc.websiteURL)}
          >
            <Image 
              source={acc.imageURL ? { uri: acc.imageURL } : require('../assets/image.png')}
              style={styles.accommodationImage}
            />
            <View style={styles.accommodationInfo}>
              <Text style={styles.accommodationName}>{acc.name}</Text>
              <Text style={styles.accommodationDesc}>{acc.description}</Text>
              <Text style={styles.accommodationPrice}>
                평균 {acc.averagePrice.toLocaleString()}원
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };
  
  // 놀거리 탭 렌더링 컴포넌트
  const renderActivities = () => {
    if (!tripPlan?.tripPlan[0]) return null;
  
    const activities = Object.values(tripPlan.tripPlan[0]).flatMap(day => [
      day.morningActivity,
      day.afternoonActivity
    ]).filter(activity => activity.activityName);
  
    return (
      <ScrollView contentContainerStyle={styles.activitiesContainer}>
        {activities.map((activity, index) => (
          <TouchableOpacity 
            key={index}
            style={styles.activityCard}
            onPress={() => activity.websiteURL && Linking.openURL(activity.websiteURL)}
          >
            <Image 
              source={activity.imageURL ? { uri: activity.imageURL } : require('../assets/image.png')}
              style={styles.activityImage}
            />
            <View style={styles.activityInfo}>
              <Text style={styles.activityTitle}>{activity.activityName}</Text>
              {activity.description && (
                <Text style={styles.activityDescription}>{activity.description}</Text>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };

  const renderDayPlan = (dayKey, dayData) => (
    <View style={styles.dayContainer} key={dayKey}>
      <Text style={styles.dayTitle}>{dayKey.toUpperCase()}</Text>
      <View style={styles.activityContainer}>
        <View style={styles.activity}>
          <Text style={styles.activityTime}>오전</Text>
          <Text style={styles.activityName}>{dayData.morningActivity.activityName}</Text>
          {dayData.morningActivity.description && (
            <Text style={styles.activityDesc}>{dayData.morningActivity.description}</Text>
          )}
        </View>
        <View style={styles.activity}>
          <Text style={styles.activityTime}>점심</Text>
          <Text style={styles.activityName}>{dayData.lunch.place}</Text>
          <Text style={styles.activityDesc}>{dayData.lunch.description}</Text>
          <Text style={styles.price}>평균 {dayData.lunch.averagePrice.toLocaleString()}원</Text>
        </View>
        <View style={styles.activity}>
          <Text style={styles.activityTime}>오후</Text>
          <Text style={styles.activityName}>{dayData.afternoonActivity.activityName}</Text>
          {dayData.afternoonActivity.description && (
            <Text style={styles.activityDesc}>{dayData.afternoonActivity.description}</Text>
          )}
        </View>
        <View style={styles.activity}>
          <Text style={styles.activityTime}>저녁</Text>
          <Text style={styles.activityName}>{dayData.dinner.place}</Text>
          <Text style={styles.activityDesc}>{dayData.dinner.description}</Text>
          <Text style={styles.price}>평균 {dayData.dinner.averagePrice.toLocaleString()}원</Text>
        </View>
        {dayData.accommodation && (
          <View style={styles.activity}>
            <Text style={styles.activityTime}>숙소</Text>
            <Text style={styles.activityName}>{dayData.accommodation.name}</Text>
            <Text style={styles.activityDesc}>{dayData.accommodation.description}</Text>
            <Text style={styles.price}>평균 {dayData.accommodation.averagePrice.toLocaleString()}원</Text>
          </View>
        )}
      </View>
    </View>
  );

  

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF9500" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* 기존 헤더 부분 유지 */}
      <View style={styles.tabContainer}>
        {tabItems.map((tab) => (
          <Tab key={tab} title={tab} activeTab={activeTab} setActiveTab={setActiveTab} />
        ))}
      </View>
  
      {activeTab === '일정' && (
        <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
          {tripPlan &&
            tripPlan.tripPlan[0] &&
            Object.entries(tripPlan.tripPlan[0]).map(([key, value]) => renderDayPlan(key, value))}
        </ScrollView>
      )}
      {activeTab === '숙소' && renderAccommodations()}
      {activeTab === '놀거리' && renderActivities()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  imageContainer: {
    position: 'relative',
    height: 200,
    marginBottom: 16,
  },
  headerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 16,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    padding: 8,
  },
  overlay: {
    position: 'absolute',
    bottom: 16,
    left: 16,
  },
  cityName: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  totalPrice: {
    color: '#FFF',
    fontSize: 16,
    marginTop: 4,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  dayContainer: {
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  dayTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  activityContainer: {
    gap: 12,
  },
  activity: {
    backgroundColor: '#FFF',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  accommodationContainer: {
    padding: 16,
  },
  accommodationCard: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  accommodationImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  accommodationInfo: {
    padding: 16,
  },
  accommodationName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  accommodationDesc: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  accommodationPrice: {
    fontSize: 16,
    color: '#FF9500',
    fontWeight: 'bold',
  },
  activitiesContainer: {
    padding: 16,
  },
  activityCard: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  activityImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  activityInfo: {
    padding: 16,
  },
  activityTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  activityDescription: {
    fontSize: 14,
    color: '#666',
  },
});

export default Enjoy;
