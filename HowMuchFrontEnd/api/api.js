import axios from "axios";


const axiosInstanceSpring = axios.create({
    baseURL: 'http://localhost:8080',
    withCredentials: true
})

const axiosInstancePython = axios.create({
    baseURL : 'http://localhost:8000',
    withCredentials: true
})