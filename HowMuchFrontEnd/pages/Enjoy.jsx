// pages/Enjoy.js
import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Tab } from '../components';
import { getRecommendation } from '../api';

const Enjoy = ({ route, navigation }) => {
  const [activeTab, setActiveTab] = useState('일정');
  const [loading, setLoading] = useState(true);
  const [tripPlan, setTripPlan] = useState(null);
  const { recommendData } = route.params; // 이전 화면에서 전달받은 추천 데이터

  const tabItems = ['일정', '숙소', '놀거리'];

  useEffect(() => {
    fetchRecommendation();
  }, []);

  const fetchRecommendation = async () => {
    try {
      const response = await getRecommendation(recommendData);
      setTripPlan(response.recommendation.tripPlan);
      setLoading(false);
    } catch (error) {
      console.error('추천 조회 에러:', error);
      setLoading(false);
    }
  };

  const renderDayPlan = (day, dayData) => (
    <View style={styles.dayContainer} key={day}>
      <Text style={styles.dayTitle}>{day}</Text>
      <View style={styles.activityContainer}>
        <View style={styles.activity}>
          <Text style={styles.activityTime}>오전</Text>
          <Text style={styles.activityName}>{dayData.morningActivity.activityName}</Text>
          <Text style={styles.activityDesc}>{dayData.morningActivity.description}</Text>
        </View>
        <View style={styles.activity}>
          <Text style={styles.activityTime}>점심</Text>
          <Text style={styles.activityName}>{dayData.lunch.place}</Text>
          <Text style={styles.activityDesc}>{dayData.lunch.description}</Text>
          <Text style={styles.price}>평균 {dayData.lunch.averagePrice}원</Text>
        </View>
        <View style={styles.activity}>
          <Text style={styles.activityTime}>오후</Text>
          <Text style={styles.activityName}>{dayData.afternoonActivity.activityName}</Text>
          <Text style={styles.activityDesc}>{dayData.afternoonActivity.description}</Text>
        </View>
        <View style={styles.activity}>
          <Text style={styles.activityTime}>저녁</Text>
          <Text style={styles.activityName}>{dayData.dinner.place}</Text>
          <Text style={styles.activityDesc}>{dayData.dinner.description}</Text>
          <Text style={styles.price}>평균 {dayData.dinner.averagePrice}원</Text>
        </View>
        {dayData.accommodation && (
          <View style={styles.activity}>
            <Text style={styles.activityTime}>숙소</Text>
            <Text style={styles.activityName}>{dayData.accommodation.name}</Text>
            <Text style={styles.activityDesc}>{dayData.accommodation.description}</Text>
            <Text style={styles.price}>평균 {dayData.accommodation.averagePrice}원</Text>
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
      <View style={styles.imageContainer}>
        <Image source={require('../assets/busan-city.png')} style={styles.headerImage} />
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" size={24} color="white" />
        </TouchableOpacity>
        <View style={styles.overlay}>
          <Text style={styles.cityName}>{tripPlan?.place || '여행지'}</Text>
          <Text style={styles.totalPrice}>총 예상 비용: {tripPlan?.totalExpense?.toLocaleString()}원</Text>
        </View>
      </View>

      <View style={styles.tabContainer}>
        {tabItems.map((tab) => (
          <Tab key={tab} title={tab} activeTab={activeTab} setActiveTab={setActiveTab} />
        ))}
      </View>

      <ScrollView style={styles.content}>
        {tripPlan && Object.entries(tripPlan)
          .filter(([key]) => key.startsWith('day'))
          .map(([day, dayData]) => renderDayPlan(day, dayData))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  // 기존 스타일 유지
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayContainer: {
    marginBottom: 20,
    padding: 16,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
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
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
  },
  activityTime: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  activityName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  activityDesc: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  price: {
    fontSize: 14,
    color: '#FF9500',
    fontWeight: 'bold',
  },
  totalPrice: {
    color: 'white',
    fontSize: 16,
    marginTop: 8,
  },
});

export default Enjoy;
