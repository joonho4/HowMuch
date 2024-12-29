import axios from "axios";

const axiosInstanceSpring = axios.create({
    baseURL: 'http://192.168.233.50:8080',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json', // 오타 수정
        'Accept': 'application/json' // 오타 수정
    }
});

const axiosInstancePython = axios.create({
    baseURL: 'http://192.168.233.50:8000',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

export { axiosInstanceSpring, axiosInstancePython }; // export 방식 변경
