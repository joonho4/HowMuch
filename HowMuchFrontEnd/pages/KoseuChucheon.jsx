import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { 
  SectionHeader, 
  CheckboxGroup, 
  InputCount, 
  Recommend,
  InputField
} from '../components';
import { Alert } from 'react-native';

const KoseuChucheon = () => {
  const navigation = useNavigation();
  const [budget, setBudget] = useState('');
  const [peopleCount, setPeopleCount] = useState('');
  const [dayCount, setDayCount] = useState('')
  const [selectedRegions, setSelectedRegions] = useState([]);
  const [selectedPeople, setSelectedPeople] = useState([]);
  const [selectedThemes, setSelectedThemes] = useState([]);

  const toggleSelection = (item, selectedList, setSelectedList) => {
    setSelectedList(item)
  };

  // 추천 버튼 핸들러
  const handleRecommend = () => {
    if (!budget) {
      Alert.alert('알림', '예산을 입력해주세요');
      return;
    }
    if (!selectedRegions.length) {
      Alert.alert('알림', '지역을 선택해주세요');
      return;
    }
    if (!selectedPeople.length) {
      Alert.alert('알림', '연령대를 선택해주세요');
      return;
    }
    if (!peopleCount) {
      Alert.alert('알림', '인원 수를 입력해주세요');
      return;
    }
    if (!selectedThemes.length) {
      Alert.alert('알림', '테마를 선택해주세요');
      return;
    }
    if (!dayCount) {
      Alert.alert('알림', '여행일 수를 입력해주세요');
      return;
    }

    const recommendData = {
      budget: parseInt(budget),
      thema: selectedThemes[0],
      age: selectedPeople[0],
      destination: selectedRegions[0],
      travelers: parseInt(peopleCount),
      date: `${dayCount}일간`
    };
    console.log(`코스추천부분 ${recommendData}`);
    navigation.navigate('Enjoy', { recommendData });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>코스 추천</Text>
      </View>

      <ScrollView style={styles.content}>
        {/* 예산 섹션 */}
        <View style={styles.section}>
          <SectionHeader title="예산" iconName="dollar-sign" iconColor="#FFB800" />
          <InputCount
            placeholder="예산을 입력하세요"
            value={budget}
            onChangeText={setBudget}
            unit="원"
          />
        </View>

        {/* 지역 섹션 */}
        <View style={styles.section}>
          <SectionHeader title="지역" iconName="map-pin" iconColor="#4CAF50" />
          <CheckboxGroup
            items={['부산', '서울', '김해']}
            selectedItems={selectedRegions}
            onToggle={(item) => toggleSelection(item, selectedRegions, setSelectedRegions)}
          />
          <CheckboxGroup
            items={['포항', '대구', '구미']}
            selectedItems={selectedRegions}
            onToggle={(item) => toggleSelection(item, selectedRegions, setSelectedRegions)}
          />
          <TouchableOpacity>
            <Text style={styles.moreText}>지역 더보기 〉</Text>
          </TouchableOpacity>
        </View>

        {/* 사람 섹션 */}
        <View style={styles.section}>
          <SectionHeader title="사람" iconName="users" iconColor="#2196F3" />
          <CheckboxGroup
            items={['성인', '미성년자']}
            selectedItems={selectedPeople}
            onToggle={(item) => toggleSelection(item, selectedPeople, setSelectedPeople)}
          />
          <InputCount
            placeholder="인원을 입력하세요"
            value={peopleCount}
            onChangeText={setPeopleCount}
            unit="명"
          />
        </View>

        {/* 테마 섹션 */}
        <View style={styles.section}>
          <SectionHeader title="테마" iconName="compass" iconColor="#E91E63" />
          <CheckboxGroup
            items={['체험', '맛집', '바다']}
            selectedItems={selectedThemes}
            onToggle={(item) => toggleSelection(item, selectedThemes, setSelectedThemes)}
          />
          <CheckboxGroup
            items={['놀거리', '명소', '식사']}
            selectedItems={selectedThemes}
            onToggle={(item) => toggleSelection(item, selectedThemes, setSelectedThemes)}
          />
          <TouchableOpacity>
            <Text style={styles.moreText}>테마 더보기 〉</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <SectionHeader title="여행일 수" iconName="calendar-day" iconColor="#FF4500" />
          <InputCount
            placeholder="여행일 수를 입력해주세요."
            value={dayCount}
            onChangeText={setDayCount}
            unit="일간"
          />
        </View>
      </ScrollView>

      <View style={styles.bottomButton}>
        <Recommend 
          onPress={handleRecommend}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 24,
  },
  moreText: {
    color: '#666',
    fontSize: 12,
    marginTop: 8,
  },
  bottomButton: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
});

export default KoseuChucheon;
