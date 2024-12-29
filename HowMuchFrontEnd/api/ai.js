import { axiosInstancePython } from './api';

export const getRecommendation = async (recommendData) => {
  try {
    console.log('요청 데이터:', recommendData); // 디버깅용

    const response = await axiosInstancePython.post('/recommend', recommendData);
    
    console.log('응답 데이터:', response.data); // 디버깅용
    return response.data;
  } catch (error) {
    console.error('추천 시스템 에러:', error.response?.data || error.message);
    throw new Error('코스 추천을 가져오는데 실패했습니다.');
  }
};