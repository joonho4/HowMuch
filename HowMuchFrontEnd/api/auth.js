import axiosInstanceSpring from './api.js'

const postSignUp = async ({ email, name, password}) => {
    const { data } = await axiosInstanceSpring.post('/users/join', {
        email,
        name,
        password
    })

    return data
}

const postLogin = async ({ email, password }) => {
    const { data } = await axiosInstanceSpring.post('/users/login', {
      email,
      password,
    });
  
    return data;
};


const getProfile = async () => {
    const { data } = await axiosInstanceSpring.get('/users/me', {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });
  
    return data;
};
  
export { postSignUp, postLogin, getProfile, getAccessToken, logout };


