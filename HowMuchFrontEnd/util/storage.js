// utils/storage.js
import AsyncStorage from '@react-native-async-storage/async-storage';

export const setToken = async (accessToken, refreshToken) => {
    try {
        await AsyncStorage.setItem('accessToken', accessToken);
        await AsyncStorage.setItem('refreshToken', refreshToken);
    } catch (error) {
        console.error('Token 저장 실패:', error);
    }
};

export const getToken = async (tokenType) => {
    try {
        const token = await AsyncStorage.getItem(tokenType);
        return token;
    } catch (error) {
        console.error('Token 불러오기 실패:', error);
        return null;
    }
};

export const removeTokens = async () => {
    try {
        await AsyncStorage.removeItem('accessToken');
        await AsyncStorage.removeItem('refreshToken');
    } catch (error) {
        console.error('Token 삭제 실패:', error);
    }
};
