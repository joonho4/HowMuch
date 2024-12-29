import { axiosInstanceSpring } from './api.js'; // import 방식 변경
import { setToken, getToken, removeTokens } from '../util/storage.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const postSignUp = async ({ email, name, password }) => {
    try {
        const { data } = await axiosInstanceSpring.post('/users/join', {
            email,
            name,
            password
        });
        console.log('회원가입 응답:', data); // 디버깅용
        return data;
    } catch (error) {
        console.error('회원가입 에러:', error.response?.data || error.message);
        throw error;
    }
};

const postLogin = async ({ email, password }) => {
    try {
        const { data } = await axiosInstanceSpring.post('/users/login', {
            email,
            password,
        });
        
        // AsyncStorage에 토큰 저장
        if (data.jwtAccessToken.token) {
            await AsyncStorage.setItem('accessToken', data.jwtAccessToken.token);
            console.log('토큰 저장됨:', data.jwtAccessToken.token);
        }
        
        return data;
    } catch (error) {
        console.error('로그인 에러:', error);
        throw error;
    }
};


const getProfile = async () => {
    try {
        const accessToken = await getToken('accessToken');
        if (!accessToken) {
            throw new Error('토큰이 없습니다');
        }
        
        const response = await axiosInstanceSpring.get('/users/profile', {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('프로필 조회 에러:', error);
        throw error;
    }
};


const logout = async () => {
    try {
        await axiosInstanceSpring.post('/users/logout');
        await removeTokens();
    } catch (error) {
        console.error('로그아웃 에러:', error.response?.data || error.message);
        throw error;
    }
};

const checkAuth = async () => {
    const accessToken = await getToken('accessToken');
    return !!accessToken;
};

export { postSignUp, postLogin, getProfile, checkAuth, logout };
