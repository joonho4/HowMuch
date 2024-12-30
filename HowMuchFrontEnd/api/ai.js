import { axiosInstancePython } from './api';

export const getRecommendation = async (budget, thema, age, destination, travelers, date) => {
  try {
    console.log('요청 데이터:', budget, thema, age, destination, travelers, date); // 디버깅용

    const { data } = await axiosInstancePython.post('/recommend', {
      budget,
      thema,
      age,
      destination, 
      travelers,
      date
    });
    
    console.log('응답 데이터:', data); // 디버깅용
    return data;
  } catch (error) {
    console.error('추천 시스템 에러:', error.response?.data || error.message);
    throw new Error('코스 추천을 가져오는데 실패했습니다.');
  }
};