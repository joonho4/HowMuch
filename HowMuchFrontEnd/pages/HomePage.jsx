import React from 'react';
import { ScrollView, SafeAreaView, StyleSheet, View, Text } from 'react-native';
import HeroSection from '../components/HeroSection';
import RecommendButton from '../components/RecommendButton';
import CourseCard from '../components/CourseCard';
import BottomNav from '../components/BottomNav';

const HomePage = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Hero Section */}
      <HeroSection />

      <ScrollView style={styles.content}>
        <RecommendButton />
        <View style={styles.coursesSection}>
          <Text style={styles.sectionTitle}>최근 코스</Text>
          <CourseCard
            title="부산"
            detail="바다, 광안대교"
            price="870,000원"
            imageUri="https://via.placeholder.com/100x100"
          />
          <CourseCard
            title="서울"
            detail="광장시장, 명동"
            price="650,000원"
            imageUri="https://via.placeholder.com/100x100"
          />
        </View>
      </ScrollView>

      <BottomNav />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 24,
  },
  coursesSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});

export default HomePage;
